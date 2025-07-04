import type { useTools } from './use-tools';
import type { TOOLS } from '../../constants/tools';

export type ToolType = (typeof TOOLS)[number]['type'];

export type ToolsViewProps = ReturnType<typeof useTools>;
