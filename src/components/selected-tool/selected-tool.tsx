import type { JSX } from 'react';
import { NODE } from '../../enums';
import { RectangleTool } from '../rectangle-tool';
import type { ToolsState } from '../../store/types';
import { useToolsStore } from '../../store/tools-store';
import { useShallow } from 'zustand/shallow';
import { CircleTool } from '../circle-tool';

const toolsSelector = (state: ToolsState) => ({
  selectedTool: state.selectedTool,
});

export const SelectedTool = () => {
  const { selectedTool } = useToolsStore(useShallow(toolsSelector));

  if (!selectedTool) return null;

  let component: JSX.Element | null = null;

  switch (selectedTool) {
    case NODE.BASIC:
      component = <RectangleTool />;
      break;
    case NODE.CIRCLE:
      component = <CircleTool />;
      break;
  }

  return component;
};
