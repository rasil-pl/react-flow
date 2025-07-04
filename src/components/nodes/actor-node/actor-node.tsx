import { UserIcon } from 'lucide-react';
import type { ActorNodeProps } from './actor-node.types';
import { Handle, Position } from '@xyflow/react';
import { EditableText } from '../../editable-text';

export const ActorNode: React.FC<ActorNodeProps> = ({ id, data }) => {
  return (
    <>
      <div className='p-2 shadow-md rounded-md bg-black/5 border-1 border-gray-400 min-w-[200px] min-h-[60px] w-full h-full flex justify-center'>
        <div className='flex w-full gap-2'>
          <div className='border border-gray-400 p-1 rounded-sm self-start'>
            <UserIcon />
          </div>
          <div className='flex-1 w-full'>
            <EditableText
              type='node'
              id={id}
              data={data}
              inputClassName='text-start w-[200px]'
            />
            <p className='font-light text-xs text-gray-500'>Description</p>
          </div>
        </div>
      </div>
      <Handle type='target' position={Position.Left} isConnectable />
      <Handle type='source' position={Position.Right} isConnectable />
    </>
  );
};
