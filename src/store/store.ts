import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from '@xyflow/react';

import { type AppState } from './types';
import { EDGE } from '../enums';

export const useStore = create<AppState>()((set, get) => {
  return {
    nodes: [],
    edges: [],
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onNodesLabelChange: (id: string, label: string) => {
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
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge(
          {
            ...connection,
            type: EDGE.CENTER_LABEL,
            data: { label: 'Edge' },
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          get().edges,
        ),
      });
    },
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
  };
});
