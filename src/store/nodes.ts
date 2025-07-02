import { NODE } from '../enums';
import { type AppNode } from './types';

export const initialNodes = [
  {
    id: '1',
    type: NODE.BASIC,
    data: { label: 'Input' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    type: NODE.BASIC,
    data: { label: 'Default' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: NODE.BASIC,
    data: { label: 'Output' },
    position: { x: 250, y: 250 },
  },
] as AppNode[];
