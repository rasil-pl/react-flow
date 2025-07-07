import {
  CircleIcon,
  CornerUpRightIcon,
  MoveUpRightIcon,
  SplineIcon,
  SquareIcon,
} from 'lucide-react';
import { EDGE, NODE } from '../enums';

export const TOOLS = [
  {
    id: 'square',
    label: 'Basic',
    icon: SquareIcon,
    type: NODE.BASIC,
  },
  {
    id: 'circle',
    label: 'Circle',
    icon: CircleIcon,
    type: NODE.CIRCLE,
  },
  {
    id: 'straight-edge',
    lable: 'Straight edge',
    icon: MoveUpRightIcon,
    type: EDGE.STRAIGHT,
  },
  {
    id: 'smooth-step',
    lable: 'Smooth Step',
    icon: CornerUpRightIcon,
    type: EDGE.SMOOTH_STEP,
  },
  {
    id: 'bezier',
    lable: 'Bezier',
    icon: SplineIcon,
    type: EDGE.BEZIER,
  },
] as const;
