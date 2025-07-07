import { useReactFlow, type XYPosition } from '@xyflow/react';
import { useState, type PointerEvent } from 'react';
import { useToolsStore } from '../../store/tools-store';
import { useShallow } from 'zustand/shallow';
import type { AppState, ToolsState } from '../../store/types';
import { useStore } from '../../store';
import { nanoid } from 'nanoid';
import { NODE, TOOL } from '../../enums';

type Pos = {
  start: XYPosition | null;
  end: XYPosition | null;
};

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
  const w = Math.abs(end.x - start.x) / zoom;
  const h = Math.abs(end.y - start.y) / zoom;
  const length = Math.min(w, h);
  return {
    width: length,
    height: length,
  };
};

const selector = (state: AppState) => ({
  setNodes: state.setNodes,
  onNodesLabelChange: state.onNodesLabelChange,
});

export const CircleTool = () => {
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
        type: NODE.CIRCLE,
        position,
        ...dimension,
        data: {},
      },
    ]);
    setSelectedTool(TOOL.MOVE);

    setPos({ start: null, end: null });
  };

  const circle =
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
      {circle && (
        <div
          className='absolute z-10 border-1 border-gray-200 bg-black/5 aspect-square rounded-full'
          style={{
            ...circle.dimension,
            transform: `translate(${circle.position.x}px, ${circle.position.y}px)`,
            pointerEvents: 'none',
          }}
        ></div>
      )}
    </div>
  );
};
