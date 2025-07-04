import type { Edge, EdgeProps } from '@xyflow/react';

export type EdgeControllerProps = EdgeProps<
  Edge<{ label: string; highlighted: boolean }>
>;
