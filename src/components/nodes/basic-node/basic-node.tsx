import { Handle, NodeResizer, Position } from '@xyflow/react';
import type { BasicNodeProps } from './basic-node.types.ts';
import { EditableText } from '../../editable-text';

export const BasicNode: React.FC<BasicNodeProps> = ({ id, data, selected }) => {
  return (
    <>
      <div className='px-4 py-2 shadow-md rounded-md bg-black/5 border-1 border-gray-400 min-w-[218px] min-h-[60px] w-full h-full flex justify-center'>
        <NodeResizer minWidth={218} minHeight={60} isVisible={selected} />
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
