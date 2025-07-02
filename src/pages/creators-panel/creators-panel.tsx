import '@xyflow/react/dist/style.css';
import { useCreatorsPanel } from './use-creators-panel.ts';
import { CreatorsPanelView } from './creators-panel-view.tsx';

export const CreatorsPanel = () => {
  const logic = useCreatorsPanel();
  return <CreatorsPanelView {...logic} />;
};
