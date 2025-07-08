import { create, type StateCreator } from 'zustand';
import {
  applyNodeChanges,
  applyEdgeChanges,
  type Connection,
  type Edge,
} from '@xyflow/react';

import { type AppState } from './types';
import { createJSONStorage, persist } from 'zustand/middleware';

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

  const isValidConnection = (connection: Edge | Connection) => {
    const { source, target } = connection;
    return source !== target;
  };

  return {
    nodes: [],
    getNodes: () => get().nodes,
    edges: [],
    getEdges: () => get().edges,
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
    onNodesLabelChange,
    onEdgesLabelChange,
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
  };
};

export const useStore = create<AppState>()(
  persist(createAppState, {
    name: 'storage',
    storage: createJSONStorage(() => localStorage),
  }),
);
