import { Handle, NodeResizer, Position } from '@xyflow/react';
import type { CircleNodeProps } from './circle-node.types';
import { EditableText } from '../../editable-text';

export const CircleNode: React.FC<CircleNodeProps> = ({
  id,
  data,
  selected,
}) => {
  return (
    <>
      <div className='w-full aspect-square rounded-full border border-gray-400 bg-black/5 flex justify-center'>
        <NodeResizer
          minWidth={50}
          minHeight={50}
          isVisible={selected}
          keepAspectRatio={true}
        />
        <EditableText type='node' id={id} data={data} />
      </div>
      <Handle
        type='target'
        position={Position.Left}
        isConnectable
        className='!h-4 !rounded-sm !bg-gray-400'
      />
      <Handle
        type='source'
        position={Position.Right}
        isConnectable
        className='!h-4 !rounded-sm !bg-gray-400'
      />
    </>
  );
};
