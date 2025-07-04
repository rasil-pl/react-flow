import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getSmoothStepPath,
} from '@xyflow/react';
import type { CenterLabelEdgeProps } from './center-label-edge.types.ts';
import { EditableText } from '../../editable-text';
import { cn } from '../../../utils/tw.ts';

export const CenterLabelEdge: React.FC<CenterLabelEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        className={cn({
          'highlighted !stroke-green-400': data?.highlighted,
        })}
      />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              transform: `translate(-50%,-50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              userSelect: 'all',
            }}
            className={cn(
              `absolute nodrag nopan bg-white/80 border border-gray-200 w-fit p-1`,
              {
                highlighted: data?.highlighted,
              },
            )}
          >
            <EditableText type='edge' id={id} data={data} />
          </div>
        </EdgeLabelRenderer>
      )}
      {data?.highlighted && (
        <g>
          {[...Array(10)].map((_, i) => {
            const delay = i * 0.02;
            const size = Math.max(0, 4 - i * 0.4);
            const opacity = Math.max(0.2, 0.9 - i * 0.04);

            return (
              <circle key={i} r={size} fill='#2e6f40' opacity={opacity}>
                <animateMotion
                  dur='2s'
                  repeatCount='indefinite'
                  path={edgePath}
                  begin={`${delay}s`}
                />
              </circle>
            );
          })}
        </g>
      )}
    </>
  );
};
