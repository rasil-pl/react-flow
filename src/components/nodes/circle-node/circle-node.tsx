import { Handle, Position } from '@xyflow/react';
import type { CircleNodeProps } from './circle-node.types';
import { EditableText } from '../../editable-text';

export const CircleNode: React.FC<CircleNodeProps> = ({ id, data }) => {
  return (
    <>
      <div className='min-w-[100px] min-h-[100px] w-full h-full rounded-full border border-gray-400 bg-black/5 flex justify-center'>
        <EditableText id={id} data={data} />
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
