import { ActorNode } from '../components/nodes/actor-node';
import { BasicNode } from '../components/nodes/basic-node/basic-node';
import { CircleNode } from '../components/nodes/circle-node';
import { NODE } from '../enums';

export const nodeTypes = {
  [NODE.BASIC]: BasicNode,
  [NODE.ACTOR]: ActorNode,
  [NODE.CIRCLE]: CircleNode,
} as const;
