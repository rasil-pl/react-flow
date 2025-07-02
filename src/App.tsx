import { ReactFlowProvider } from '@xyflow/react';
import { CreatorsPanel } from './pages/creators-panel';

function App() {
  return (
    <ReactFlowProvider>
      <div style={{ width: '100dvw', height: '100dvh' }}>
        <CreatorsPanel />
      </div>
    </ReactFlowProvider>
  );
}

export default App;
