import type { AppNode } from '../../store/types';
import { useNodeProperties } from './use-node-properties';

export const NodeProperties = ({ node }: { node: AppNode }) => {
  const { label, handleChange, handleSubmit, inputRef } =
    useNodeProperties(node);

  return (
    <div>
      <h2>Layout</h2>
      <div className='mt-1 grid grid-cols-2 gap-1'>
        <div>
          <label htmlFor={`x-pos-${node.id}`}>X:&nbsp;</label>
          <span id={`x-pos-${node.id}`}>{node.position.x.toFixed(2)}</span>
        </div>
        <div>
          <label htmlFor={`y-pos-${node.id}`}>Y:&nbsp;</label>
          <span id={`y-pos-${node.id}`}>{node.position.y.toFixed(2)}</span>
        </div>
        <div>
          <label htmlFor={`w-${node.id}`}>Width:&nbsp;</label>
          <span id={`w-${node.id}`}>{node.width}</span>
        </div>
        <div>
          <label htmlFor={`h-${node.id}`}>Height:&nbsp;</label>
          <span id={`h-${node.id}`}>{node.height}</span>
        </div>
      </div>

      <form className='mt-4' onSubmit={handleSubmit}>
        <label htmlFor='text'>Label:</label>
        <input
          ref={inputRef}
          type='text'
          id='text'
          value={label}
          onChange={handleChange}
          className='block border w-full border-gray-300 rounded-md p-1 mt-1'
        />
        <input type='submit' hidden />
      </form>
    </div>
  );
};
