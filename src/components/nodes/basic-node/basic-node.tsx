import { Handle, NodeResizer, Position } from '@xyflow/react';
import type { BasicNodeProps } from './basic-node.types.ts';
import { EditableText } from '../../editable-text';
import { cn } from '../../../utils/tw.ts';

export const BasicNode: React.FC<BasicNodeProps> = ({ id, data, selected }) => {
  return (
    <>
      <div
        className={cn(
          `peer px-4 py-2 shadow-md rounded-md bg-black/5 border-1 border-gray-400 w-full h-full flex justify-center`,
          {
            highlighted: data?.highlighted || selected,
          },
        )}
      >
        <NodeResizer minWidth={200} minHeight={30} isVisible={selected} />
        <EditableText type='node' id={id} data={data} />
      </div>

      <Handle
        type='source'
        position={Position.Left}
        id={`${id}-left`}
        className='opacity-0 peer-hover:opacity-100'
      />
      <Handle
        type='target'
        position={Position.Left}
        id={`${id}-left`}
        className='opacity-0 peer-hover:opacity-100'
      />

      <Handle
        type='source'
        position={Position.Right}
        id={`${id}-right`}
        className='opacity-0 peer-hover:opacity-100'
      />
      <Handle
        type='target'
        position={Position.Right}
        id={`${id}-right`}
        className='opacity-0 peer-hover:opacity-100'
      />

      <Handle
        type='source'
        position={Position.Top}
        id={`${id}-top`}
        className='opacity-0 peer-hover:opacity-100'
      />
      <Handle
        type='target'
        position={Position.Top}
        id={`${id}-top`}
        className='opacity-0 peer-hover:opacity-100'
      />

      <Handle
        type='source'
        position={Position.Bottom}
        id={`${id}-bottom`}
        className='opacity-0 peer-hover:opacity-100'
      />
      <Handle
        type='target'
        position={Position.Bottom}
        id={`${id}-bottom`}
        className='opacity-0 peer-hover:opacity-100'
      />
    </>
  );
};
