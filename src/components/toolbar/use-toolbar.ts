import { useShallow } from 'zustand/shallow';
import { useToolsStore } from '../../store/tools-store';
import type { ToolsState } from '../../store/types';

const toolSelector = (state: ToolsState) => ({
  selectedTool: state.selectedTool,
  setSelectedTool: state.setSelectedTool,
});

export const useToolbar = () => {
  const { selectedTool, setSelectedTool } = useToolsStore(
    useShallow(toolSelector),
  );

  return { selectedTool, setSelectedTool };
};
