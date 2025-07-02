import { CenterLabelEdge } from '../../components/edges/center-label-edge';
import { EDGE } from '../../enums';

export const edgeTypes = {
  [EDGE.CENTER_LABEL]: CenterLabelEdge,
} as const;
