import { ToolbarView } from './toolbar-view';
import { useToolbar } from './use-toolbar';

export const Toolbar = () => {
  const logic = useToolbar();
  return <ToolbarView {...logic} />;
};
