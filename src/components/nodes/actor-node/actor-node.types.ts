import type { Node, NodeProps } from '@xyflow/react';

export type ActorNodeProps = NodeProps<
  Node<{
    label: string;
    onchange: (id: string, val: string) => void;
  }>
>;
