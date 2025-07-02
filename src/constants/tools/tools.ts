import { CircleIcon, SquareIcon } from 'lucide-react';
import { NODE } from '../../enums';

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
];
