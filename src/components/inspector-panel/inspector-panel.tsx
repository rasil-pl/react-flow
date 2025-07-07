import { DotIcon } from 'lucide-react';
import type { Entity } from '../../store/types';
import { NodeProperties } from '../node-properties';

export const InspectorPanel = ({ entity }: { entity: Entity | null }) => {
  if (!entity) return null;

  return (
    <div className='bg-white border border-gray-200 p-4 rounded-md shadow-lg w-md max-w-md break-words h-[calc(100dvh-2rem)]'>
      <div className='flex justify-between items-center'>
        <p>{entity.type}</p>
        <DotIcon strokeWidth={6} color='gray' />
      </div>
      <hr className='border-0 border-t-1 border-gray-300 mt-2 mb-4' />
      {entity.type === 'NODE' ? <NodeProperties node={entity.detail} /> : null}
    </div>
  );
};
