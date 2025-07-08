import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store';
import { useShallow } from 'zustand/shallow';
import type { AppNode, AppState } from '../../store/types';

const selector = (state: AppState) => ({
  onNodesLabelChange: state.onNodesLabelChange,
});

export const useNodeProperties = (node: AppNode) => {
  console.log({ node });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [label, setLabel] = useState((node.data?.label as string) ?? '');
  const { onNodesLabelChange } = useStore(useShallow(selector));

  useEffect(() => {
    setLabel((node.data?.label as string) ?? '');
  }, [node]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNodesLabelChange(node.id, label);
    inputRef.current?.blur();
  };

  return { label, handleChange, handleSubmit, inputRef };
};
