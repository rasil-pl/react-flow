import { nanoid } from 'nanoid';
import { useShallow } from 'zustand/react/shallow';
import type { AppState } from '../../store/types';
import { useStore } from '../../store';
import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import { NODE } from '../../enums';

const selector = (state: AppState) => ({
  setNodes: state.setNodes,
  onNodesLabelChange: state.onNodesLabelChange,
});

export const useTools = () => {
  const { getNodes } = useReactFlow();
  const { setNodes, onNodesLabelChange } = useStore(useShallow(selector));

  const addNode = useCallback(() => {
    const updatedNodes = [
      ...getNodes(),
      {
        id: nanoid(),
        type: NODE.BASIC,
        position: { x: 0, y: 0 },
        data: { label: 'Node', onchange: onNodesLabelChange },
      },
    ];
    setNodes(updatedNodes);
  }, [setNodes, getNodes, onNodesLabelChange]);

  const handleDragStart = (
    event: React.DragEvent<HTMLButtonElement>,
    type: NODE,
  ) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('nodeType', type);
  };

  return { addNode, handleDragStart };
};
