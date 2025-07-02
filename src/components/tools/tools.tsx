import { memo } from 'react';
import { useTools } from './use-tools';
import { ToolsView } from './tools-view';

export const Tools = memo(() => {
  const logic = useTools();
  return <ToolsView {...logic} />;
});
