import type { Node, NodeProps } from '@xyflow/react';

export type BasicNodeProps = NodeProps<
  Node<{
    label: string;
    highlighted: boolean;
  }>
>;
