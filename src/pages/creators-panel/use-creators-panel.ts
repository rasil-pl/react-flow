import { useShallow } from 'zustand/react/shallow';
import type { AppState } from '../../store/types';
import { useStore } from '../../store';
import { MarkerType, useReactFlow, type OnConnectEnd } from '@xyflow/react';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import { EDGE, NODE } from '../../enums';
import { nodeTypes } from '../../constants/node-types';
import { useToolShortcuts } from '../../hooks/use-tool-shortcuts';

const selector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onNodeClick: state.onNodeClick,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  onDragOver: state.onDragOver,
  isValidConnection: state.isValidConnection,
  onEdgeClick: state.onEdgeClick,
  onPaneClick: state.onPaneClick,
});

const OFFSET = {
  X: 50,
  Y: 50,
};

export const useCreatorsPanel = () => {
  const { screenToFlowPosition } = useReactFlow();
  const {
    edges,
    nodes,
    onConnect,
    onEdgesChange,
    onNodesChange,
    onNodeClick,
    setNodes,
    setEdges,
    onDragOver,
    isValidConnection,
    onEdgeClick,
    onPaneClick,
  } = useStore(useShallow(selector));
  useToolShortcuts();

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      const nodeType = event.dataTransfer.getData('nodeType');
      if (!nodeType) {
        console.error('No node type found in data transfer');
        return;
      }
      const allowedNodeTypes = Object.keys(nodeTypes);
      if (!allowedNodeTypes.includes(nodeType)) {
        console.error(`Invalid node type: ${nodeType}`);
        return;
      }

      event.preventDefault();
      const position = screenToFlowPosition({
        x: event.clientX - OFFSET.X,
        y: event.clientY - OFFSET.Y,
      });
      const node = {
        id: nanoid(),
        type: nodeType as NODE,
        position,
        data: { label: 'Node' },
      };
      setNodes(nodes.concat(node));
    },
    [nodes, screenToFlowPosition, setNodes],
  );

  const onConnectEnd: OnConnectEnd = (event, connectionState) => {
    if (!connectionState.fromNode?.id) return;
    if (!connectionState.isValid) {
      const { clientX, clientY } =
        'changedTouches' in event ? event.changedTouches[0] : event;
      const id = nanoid();
      const newNode = {
        id,
        type: NODE.BASIC,
        position: screenToFlowPosition({
          x: clientX,
          y: clientY,
        }),
        data: { label: 'Node' },
      };
      setNodes(nodes.concat(newNode));
      setEdges(
        edges.concat({
          id,
          data: { label: 'Edge' },
          type: EDGE.CENTER_LABEL,
          source: connectionState.fromNode.id,
          target: id,
          markerEnd: { type: MarkerType.ArrowClosed, height: 40, width: 20 },
        }),
      );
    }
  };

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onDrop,
    onDragOver,
    isValidConnection,
    onConnectEnd,
    onNodeClick,
    onEdgeClick,
    onPaneClick,
  };
};
