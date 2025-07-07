import { ConnectionLineType } from '@xyflow/react';
import { EDGE } from '../enums';
import { EdgeController } from '../components/edge-controller';

export const edgeTypes = {
  [EDGE.STRAIGHT]: EdgeController(ConnectionLineType.Straight),
  [EDGE.BEZIER]: EdgeController(ConnectionLineType.Bezier),
  [EDGE.SMOOTH_STEP]: EdgeController(ConnectionLineType.SmoothStep),
} as const;
