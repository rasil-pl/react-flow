import type { Entity } from '../../store/types';

export const InspectorPanel = ({ entity }: { entity: Entity | null }) => {
  if (!entity) return null;

  return (
    <div className='bg-white border border-gray-200 p-4 rounded-md shadow-lg max-w-md break-words h-[calc(100dvh-2rem)]'>
      <p>{entity.type}</p>
      <p>{JSON.stringify(entity.detail)}</p>
    </div>
  );
};
