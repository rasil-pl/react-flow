import { ConnectionLineType } from '@xyflow/react';
import { EdgeController } from '../../components/edge-controller';
import { EDGE } from '../../enums';

export const edgeTypes = {
  [EDGE.STRAIGHT]: EdgeController(ConnectionLineType.Straight),
  [EDGE.BEZIER]: EdgeController(ConnectionLineType.Bezier),
  [EDGE.SMOOTH_STEP]: EdgeController(ConnectionLineType.SmoothStep),
} as const;
