import { Background, Controls, Panel, ReactFlow } from '@xyflow/react';
import type { CreatorsPanelViewProps } from './creators-panel.types';
import { nodeTypes } from '../../constants/node-types';
import { Tools } from '../../components/tools';
import { edgeTypes } from '../../constants/edge-types';
import { SelectedTool } from '../../components/selected-tool';
import { Toolbar } from '../../components/toolbar';
import { InspectorPanel } from '../../components/inspector-panel';

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
  options,
  selectedEntity,
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
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onlyRenderVisibleElements
        isValidConnection={isValidConnection}
        fitView={false}
        fitViewOptions={{ padding: 2 }}
        panOnDrag={false}
        selectionOnDrag={true}
        panOnScroll={true}
        {...options}
      >
        <Background />

        <SelectedTool />

        <Panel position='center-left'>
          <Tools />
        </Panel>

        <Panel position='bottom-center'>
          <Toolbar />
        </Panel>

        <Panel position='center-right'>
          <InspectorPanel entity={selectedEntity} />
        </Panel>
        <Controls />
      </ReactFlow>
    </div>
  );
};
