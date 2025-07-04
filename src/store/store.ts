import { create, type StateCreator } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  type Connection,
  type Edge,
} from '@xyflow/react';

import { type AppNode, type AppState } from './types';
import { EDGE } from '../enums';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type MouseEvent } from 'react';

type AppStateCreator = StateCreator<
  AppState,
  [],
  [['zustand/persist', 'unknown']],
  AppState
>;

const createAppState: AppStateCreator = (set, get) => {
  const onNodesLabelChange = (id: string, label: string) => {
    const updatedNodes = get().nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          data: { ...node.data, label },
        };
      }
      return node;
    });
    set({ nodes: updatedNodes });
  };

  const onEdgesLabelChange = (id: string, label: string) => {
    const updatedEdges = get().edges.map((edge) => {
      if (edge.id === id) {
        return {
          ...edge,
          data: { ...edge.data, label },
        };
      }
      return edge;
    });
    set({ edges: updatedEdges });
  };

  const onConnect = (connection: Connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: EDGE.CENTER_LABEL,
          data: { label: 'Edge' },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            height: 40,
            width: 20,
          },
        },
        get().edges,
      ),
    });
  };

  const onNodeClick = (_: MouseEvent, node: AppNode) => {
    const nodes = get().nodes;
    const edges = get().edges;

    const outgoingEdges = edges.filter((edge) => edge.source === node.id);
    const targetNodes = outgoingEdges.map((edge) =>
      nodes.find((node) => node.id === edge.target),
    );

    const incomingEdges = edges.filter((edge) => edge.target === node.id);
    const sourceNodes = incomingEdges.map((edge) =>
      nodes.find((node) => node.id === edge.source),
    );

    const connectedNodes = [...sourceNodes, ...targetNodes];
    const connectedEdges = [...incomingEdges, ...outgoingEdges];

    const connectedNodeIds = new Set(
      connectedNodes.map((node) => (node ? node.id : null)).filter(Boolean),
    );
    const connectedEdgeIds = new Set(
      connectedEdges.map((edge) => (edge ? edge.id : null)).filter(Boolean),
    );

    const updatednodes = nodes.map((node) => ({
      ...node,
      data: { ...node.data, highlighted: connectedNodeIds.has(node.id) },
    }));
    const updatedEdges = edges.map((edge) => ({
      ...edge,
      data: { ...edge.data, highlighted: connectedEdgeIds.has(edge.id) },
    }));

    set({ nodes: updatednodes, edges: updatedEdges });
  };

  const onEdgeClick = (_: MouseEvent, edge: Edge) => {
    const nodes = get().nodes;
    const edges = get().edges;

    const sourceNodeId = edge.source;
    const targetNodeId = edge.target;

    const updatedNodes = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        highlighted: node.id === sourceNodeId || node.id === targetNodeId,
      },
    }));
    const updatedEdges = edges.map((e) => ({
      ...e,
      data: { ...e.data, highlighted: e.id === edge.id },
    }));

    console.log({ edge, updatedNodes, updatedEdges });
    set({ nodes: updatedNodes, edges: updatedEdges });
  };

  const onPaneClick = (_: MouseEvent) => {
    const nodes = get().nodes;
    const edges = get().edges;

    const updatedNodes = nodes.map((node) => ({
      ...node,
      data: { ...node.data, highlighted: false },
    }));
    const updatedEdges = edges.map((edge) => ({
      ...edge,
      data: { ...edge.data, highlighted: false },
    }));

    set({ nodes: updatedNodes, edges: updatedEdges });
  };

  const isValidConnection = (connection: Edge | Connection) => {
    const { source, target } = connection;
    return source !== target;
  };

  return {
    nodes: [],
    edges: [],
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onNodeClick,
    onNodesLabelChange,
    onEdgesLabelChange,
    onConnect,
    setNodes: (nodes) => {
      set({ nodes });
    },
    setEdges: (edges) => {
      set({ edges });
    },
    onDragOver(event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    },
    isValidConnection,
    onEdgeClick,
    onPaneClick,
  };
};

export const useStore = create<AppState>()(
  persist(createAppState, {
    name: 'storage',
    storage: createJSONStorage(() => localStorage),
  }),
);
