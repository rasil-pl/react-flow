import { Background, Controls, Panel, ReactFlow } from '@xyflow/react';
import type { CreatorsPanelViewProps } from './creators-panel.types';
import { nodeTypes } from '../../constants/node-types';
import { Tools } from '../../components/tools';
import { edgeTypes } from '../../constants/edge-types';
import { SelectedTool } from '../../components/selected-tool';

export const CreatorsPanelView: React.FC<CreatorsPanelViewProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  isValidConnection,
  onConnectEnd,
  onNodeClick,
  onEdgeClick,
  onPaneClick,
}) => {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodeClick={onNodeClick}
        onEdgesChange={onEdgesChange}
        onEdgeClick={onEdgeClick}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        panOnDrag={false}
        onPaneClick={onPaneClick}
        selectionOnDrag={true}
        panOnScroll={true}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onlyRenderVisibleElements
        isValidConnection={isValidConnection}
        fitView={false}
        fitViewOptions={{ padding: 2 }}
      >
        <Background />

        <SelectedTool />

        <Panel position='center-left'>
          <Tools />
        </Panel>
        <Controls />
      </ReactFlow>
    </div>
  );
};
