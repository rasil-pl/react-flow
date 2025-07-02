import type { Node, NodeProps } from '@xyflow/react';

export type BasicNodeProps = NodeProps<
  Node<{
    label: string;
    onchange: (id: string, val: string) => void;
  }>
>;
