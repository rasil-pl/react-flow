import { nanoid } from 'nanoid';
import { useState, type PointerEvent } from 'react';
import { useReactFlow, type XYPosition } from '@xyflow/react';
import { useStore } from '../../store';
import { useShallow } from 'zustand/react/shallow';
import type { AppState } from '../../store/types.ts';
import { NODE, TOOL } from '../../enums';
import { useToolsStore, type ToolsState } from '../../store/tools-store.ts';

type Pos = {
  start: XYPosition | null;
  end: XYPosition | null;
};

const selector = (state: AppState) => ({
  setNodes: state.setNodes,
  onNodesLabelChange: state.onNodesLabelChange,
});

const toolsSelector = (state: ToolsState) => ({
  setSelectedTool: state.setSelectedTool,
});

const getPosition = (start: XYPosition, end: XYPosition) => {
  return {
    x: Math.min(start.x, end.x),
    y: Math.min(start.y, end.y),
  };
};

const getDimensions = (
  start: XYPosition,
  end: XYPosition,
  zoom: number = 1,
) => {
  return {
    width: Math.abs(end.x - start.x) / zoom,
    height: Math.abs(end.y - start.y) / zoom,
  };
};

export const RectangleTool = () => {
  const [pos, setPos] = useState<Pos>({
    start: null,
    end: null,
  });

  const { screenToFlowPosition, getViewport, getNodes } = useReactFlow();
  const { setNodes } = useStore(useShallow(selector));
  const { setSelectedTool } = useToolsStore(useShallow(toolsSelector));

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    setPos((pos) => ({ ...pos, start: { x: e.pageX, y: e.pageY } }));
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return;
    setPos((pos) => ({ ...pos, end: { x: e.pageX, y: e.pageY } }));
  };

  const handlePointerUp = () => {
    if (!pos.start || !pos.end) return;
    const position = screenToFlowPosition(getPosition(pos.start, pos.end));
    const dimension = getDimensions(pos.start, pos.end, getViewport().zoom);

    const id = nanoid();
    setNodes([
      ...getNodes(),
      {
        id,
        type: NODE.BASIC,
        position,
        ...dimension,
        data: {},
      },
    ]);
    setSelectedTool(TOOL.MOVE);

    setPos({ start: null, end: null });
  };

  const rect =
    pos.start && pos.end
      ? {
          position: getPosition(pos.start, pos.end),
          dimension: getDimensions(pos.start, pos.end),
        }
      : null;

  return (
    <div
      className='nopan nodrag tool-overlay cursor-cell'
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {rect && (
        <div
          className='absolute z-10 border-1 border-gray-200 bg-black/5'
          style={{
            ...rect.dimension,
            transform: `translate(${rect.position.x}px, ${rect.position.y}px)`,
            pointerEvents: 'none',
          }}
        ></div>
      )}
    </div>
  );
};
