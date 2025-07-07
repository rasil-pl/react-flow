import { HandIcon, MousePointer2Icon } from 'lucide-react';
import { TOOL } from '../enums';

export const TOOLBAR_ITEMS = [
  {
    id: 'move',
    label: 'Move',
    icon: MousePointer2Icon,
    type: TOOL.MOVE,
  },
  {
    id: 'pan',
    label: 'Pan',
    icon: HandIcon,
    type: TOOL.HAND,
  },
];
