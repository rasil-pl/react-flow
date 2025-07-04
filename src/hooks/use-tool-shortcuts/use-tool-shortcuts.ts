import { useEffect } from 'react';
import { useToolsStore, type ToolsState } from '../../store/tools-store';
import { useShallow } from 'zustand/shallow';
import { NODE, TOOL } from '../../enums';

const selector = (state: ToolsState) => ({
  setSelectedTool: state.setSelectedTool,
});

export const useToolShortcuts = () => {
  const { setSelectedTool } = useToolsStore(useShallow(selector));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLInputElement;

      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) ||
        target.isContentEditable ||
        target.closest('[contenteditable="true"]')
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'escape':
        case 'm': // Move tool
          setSelectedTool(TOOL.MOVE);
          break;
        case 'r': // Move tool
          setSelectedTool(NODE.BASIC);
          break;
        case 'o': // Move tool
          setSelectedTool(NODE.CIRCLE);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedTool]);

  return null;
};
