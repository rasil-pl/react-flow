import { create } from 'zustand';
import { TOOL } from '../enums';
import type { ToolsState } from './types';

export const useToolsStore = create<ToolsState>()((set, get) => ({
  selectedTool: TOOL.MOVE,
  setSelectedTool: (tool) => set({ selectedTool: tool }),
  getSelectedTool: () => get().selectedTool,
}));
