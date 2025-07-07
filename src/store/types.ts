import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type IsValidConnection,
} from '@xyflow/react';
import type { ToolType } from '../components/tools/tools.types';

export type AppNode = Node;

export type AppState = {
  nodes: AppNode[];
  getNodes: () => AppNode[];
  edges: Edge[];
  getEdges: () => Edge[];
  onNodesChange: OnNodesChange<AppNode>;
  onNodesLabelChange: (id: string, label: string) => void;
  onEdgesChange: OnEdgesChange;
  onEdgesLabelChange: (id: string, label: string) => void;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  isValidConnection: IsValidConnection;
};

export type ToolsState = {
  selectedTool: ToolType | null;
  setSelectedTool: (tool: ToolType | null) => void;
  getSelectedTool: () => ToolType | null;
};

export type Entity =
  | {
      type: 'NODE';
      detail: Node;
    }
  | { type: 'EDGE'; detail: Edge };

export type EntityDetailState = {
  selectedEntity: Entity | null;
  setSelectedEntity: (entity: Entity | null) => void;
};
