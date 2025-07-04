import { useShallow } from 'zustand/shallow';
import { useEditable } from '../../hooks/use-editable';
import { useStore } from '../../store';
import { cn } from '../../utils/tw';
import type { EditableTextProps } from './editable-text.types';
import { useRef } from 'react';
import type { AppState } from '../../store/types';

const selector = (state: AppState) => ({
  onNodesLabelChange: state.onNodesLabelChange,
  onEdgesLabelChange: state.onEdgesLabelChange,
});

export const EditableText: React.FC<EditableTextProps> = ({
  id,
  data,
  type,
  inputClassName,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { onEdgesLabelChange, onNodesLabelChange } = useStore(
    useShallow(selector),
  );
  const {
    textareaRef,
    isEditing,
    handleBlur,
    handleDoubleClick,
    handleKeyDown,
  } = useEditable();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (type === 'edge') {
      onEdgesLabelChange(id, event.target.value);
    } else if (type === 'node') {
      onNodesLabelChange(id, event.target.value);
    } else {
      console.error('Type not specified');
    }
  };

  return (
    <div ref={containerRef} className='flex justify-center items-center'>
      {isEditing ? (
        <textarea
          id={`editable-text-${id}`}
          ref={textareaRef}
          value={data.label || ''}
          placeholder='Node'
          className={cn(
            'focus-visible:outline-none text-center resize-none field-sizing-content',
            inputClassName,
          )}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoComplete='off'
          rows={1}
          style={{
            width: containerRef.current
              ? containerRef.current.clientWidth
              : '100%',
          }}
        />
      ) : (
        <div
          className={cn('text-center break-words whitespace-pre-wrap', {
            'text-gray-400 italic': !data.label,
          })}
          style={{
            width: containerRef.current
              ? `max(${containerRef.current.clientWidth}px, 200px)`
              : '100%',
          }}
          onDoubleClick={handleDoubleClick}
        >
          {data?.label || 'Node'}
        </div>
      )}
    </div>
  );
};
