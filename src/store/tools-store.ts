import { create } from 'zustand';
import type { ToolType } from '../components/tools/tools.types';
import { TOOL } from '../enums';

export type ToolsState = {
  selectedTool: ToolType | null;
  setSelectedTool: (tool: ToolType | null) => void;
  getSelectedTool: () => ToolType | null;
};

export const useToolsStore = create<ToolsState>()((set, get) => ({
  selectedTool: TOOL.MOVE,
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  getSelectedTool: () => get().selectedTool,
}));
