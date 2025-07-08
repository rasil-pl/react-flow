import { useEffect, useRef, type KeyboardEvent } from 'react';
import { useStore } from '../../store';
import { useShallow } from 'zustand/shallow';
import type { AppState } from '../../store/types';

const selector = (state: AppState) => ({
  getNodes: state.getNodes,
  getEdges: state.getEdges,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

export const useEditable = ({
  type,
  id,
  data,
}: {
  type: 'node' | 'edge';
  id: string;
  data: { label?: string; isEditing?: boolean };
}) => {
  const isEditingRef = useRef(false);
  const { getNodes, getEdges, setNodes, setEdges } = useStore(
    useShallow(selector),
  );
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const updateNodeEditingState = (isEditing: boolean) => {
    const updatedNodes = getNodes().map((node) =>
      node.id === id ? { ...node, data: { ...node.data, isEditing } } : node,
    );
    setNodes(updatedNodes);
  };

  const updateEdgeEditingState = (isEditing: boolean) => {
    const updatedEdges = getEdges().map((edge) =>
      edge.id === id ? { ...edge, data: { ...edge.data, isEditing } } : edge,
    );
    setEdges(updatedEdges);
  };

  const handleDoubleClick = () => {
    if (type === 'node') {
      updateNodeEditingState(true);
    } else if (type === 'edge') {
      updateEdgeEditingState(true);
    }
    isEditingRef.current = true;
  };

  const handleBlur = () => {
    if (type === 'node') {
      updateNodeEditingState(false);
    } else if (type === 'edge') {
      updateEdgeEditingState(false);
    }
    isEditingRef.current = false;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key.toLowerCase();
    if (
      (textareaRef.current || isEditingRef.current === true) &&
      (key === 'escape' || (e.ctrlKey && key === 'enter'))
    ) {
      e.stopPropagation();
      handleBlur();
    }
  };

  useEffect(() => {
    let key: number;
    if (data?.isEditing) {
      key = setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
    return () => clearTimeout(key);
  }, [data?.isEditing]);

  return {
    handleBlur,
    handleKeyDown,
    handleDoubleClick,
    textareaRef,
  };
};
