import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

export const useEditable = () => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key.toLowerCase();
    if (isEditing && (key === 'escape' || (e.ctrlKey && key === 'enter'))) {
      e.stopPropagation();
      handleBlur();
    }
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current?.focus();
    }
  }, [isEditing]);

  return {
    handleBlur,
    handleKeyDown,
    handleDoubleClick,
    textareaRef,
    isEditing,
  };
};
