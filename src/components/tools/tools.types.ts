import type { useTools } from './use-tools';
import type { TOOLS } from '../../constants/tools';
import type { TOOLBAR_ITEMS } from '../../constants/toolbar';

export type ToolType =
  | (typeof TOOLS)[number]['type']
  | (typeof TOOLBAR_ITEMS)[number]['type'];

export type ToolsViewProps = ReturnType<typeof useTools>;
