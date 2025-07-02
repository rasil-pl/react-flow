import { Background, Controls, Panel, ReactFlow } from '@xyflow/react';
import type { CreatorsPanelViewProps } from './creators-panel.types';
import { nodeTypes } from '../../constants/node-types';
import { Tools } from '../../components/tools';
import { edgeTypes } from '../../constants/edge-types';

export const CreatorsPanelView: React.FC<CreatorsPanelViewProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onDragOver,
  onDrop,
  isValidConnection,
  onConnectEnd,
}) => {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        panOnDrag={false}
        selectionOnDrag={true}
        panOnScroll={true}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onlyRenderVisibleElements
        onDragOver={onDragOver}
        onDrop={onDrop}
        isValidConnection={isValidConnection}
        fitView
        fitViewOptions={{ padding: 2 }}
      >
        <Background />
        <Panel position='center-left'>
          <Tools />
        </Panel>
        <Controls />
      </ReactFlow>
    </div>
  );
};
