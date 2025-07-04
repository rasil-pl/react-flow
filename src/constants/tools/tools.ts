import { CircleIcon, MousePointer2Icon, SquareIcon } from 'lucide-react';
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
  // {
  //   id: 'circle',
  //   label: 'Circle',
  //   icon: CircleIcon,
  //   type: NODE.CIRCLE,
  // },
] as const;
