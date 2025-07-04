import {
  CircleIcon,
  MousePointer2Icon,
  MoveUpRightIcon,
  SquareIcon,
} from 'lucide-react';
import { NODE, TOOL } from '../../enums';

export const TOOLS = [
  {
    id: 'move',
    label: 'Move',
    icon: MousePointer2Icon,
    type: TOOL.MOVE,
  },
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
    // type:
  },
] as const;
