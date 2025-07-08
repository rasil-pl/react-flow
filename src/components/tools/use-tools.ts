import { nanoid } from 'nanoid';
import { useShallow } from 'zustand/react/shallow';
import type { AppNode, AppState, ToolsState } from '../../store/types';
import { useStore } from '../../store';
import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import { NODE } from '../../enums';
import { useToolsStore } from '../../store/tools-store';

const selector = (state: AppState) => ({
  setNodes: state.setNodes,
  onNodesLabelChange: state.onNodesLabelChange,
});

const toolsSelector = (state: ToolsState) => ({
  selectedTool: state.selectedTool,
  setSelectedTool: state.setSelectedTool,
});

export const useTools = () => {
  const { getNodes, screenToFlowPosition } = useReactFlow();
  const { setNodes } = useStore(useShallow(selector));
  const { selectedTool, setSelectedTool } = useToolsStore(
    useShallow(toolsSelector),
  );

  const addNode = useCallback(() => {
    const updatedNodes = [
      ...getNodes(),
      {
        id: nanoid(),
        type: NODE.BASIC,
        position: screenToFlowPosition({
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
        }),
        data: { isEditing: true },
        selected: true,
      } as AppNode,
    ];
    setNodes(updatedNodes);
  }, [setNodes, getNodes, screenToFlowPosition]);

  const handleDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    type: NODE,
  ) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('nodeType', type);
  };

  return { addNode, handleDragStart, selectedTool, setSelectedTool };
};
