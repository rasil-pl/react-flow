import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type IsValidConnection,
} from '@xyflow/react';
import type { MouseEvent } from 'react';

export type AppNode = Node;

export type AppState = {
  nodes: AppNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<AppNode>;
  onNodeClick: (event: MouseEvent, node: AppNode) => void;
  onNodesLabelChange: (id: string, label: string) => void;
  onEdgesChange: OnEdgesChange;
  onEdgeClick: (event: MouseEvent, edge: Edge) => void;
  onEdgesLabelChange: (id: string, label: string) => void;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  isValidConnection: IsValidConnection;
  onPaneClick: (event: MouseEvent) => void;
};
