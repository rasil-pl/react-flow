import type { Edge, EdgeProps } from '@xyflow/react';

export type CenterLabelEdgeProps = EdgeProps<
  Edge<{ label: string; highlighted: boolean }>
>;
