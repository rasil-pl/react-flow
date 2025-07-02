import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';
import type { CenterLabelEdgeProps } from './center-label-edge.types.ts';
import { EditableText } from '../../editable-text';

export const CenterLabelEdge: React.FC<CenterLabelEdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      {data?.label && (
        <EdgeLabelRenderer>
          <div
            style={{
              transform: `translate(-50%,-50%) translate(${labelX}px,${labelY}px)`,
            }}
            className='edge-label-renderer__custom-edge nodrag nopan bg-white/80 border border-gray-200 w-fit p-1'
          >
            <EditableText id={id} data={data} />
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};
