import { useShallow } from 'zustand/react/shallow';
import type { AppState } from '../../store/types';
import { useStore } from '../../store';
import {
  MarkerType,
  useReactFlow,
  type Connection,
  type Edge,
  type OnConnectEnd,
} from '@xyflow/react';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import { EDGE, NODE } from '../../enums';
import { nodeTypes } from '../../constants/node-types';

const selector = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onNodesLabelChange: state.onNodesLabelChange,
  onEdgesChange: state.onEdgesChange,
  onEdgesLabelChange: state.onEdgesLabelChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setEdges: state.setEdges,
  onDragOver: state.onDragOver,
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
    onEdgesLabelChange,
    onNodesChange,
    onNodesLabelChange,
    setNodes,
    setEdges,
    onDragOver,
  } = useStore(useShallow(selector));

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
        data: { label: 'Node', onchange: onNodesLabelChange },
      };
      setNodes(nodes.concat(node));
    },
    [nodes, onNodesLabelChange, screenToFlowPosition, setNodes],
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
        data: { label: 'Node', onchange: onNodesLabelChange },
      };
      setNodes(nodes.concat(newNode));
      setEdges(
        edges.concat({
          id,
          data: { label: 'Edge', onchange: onEdgesLabelChange },
          type: EDGE.CENTER_LABEL,
          source: connectionState.fromNode.id,
          target: id,
          markerEnd: { type: MarkerType.ArrowClosed },
        }),
      );
    }
  };

  const isValidConnection = (connection: Edge | Connection) => {
    const { source, target } = connection;
    return source !== target;
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
  };
};
