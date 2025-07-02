import { useEffect, useRef, useState } from 'react';

export const useEditable = () => {
  const [isEditing, setIsEditing] = useState(false);
  // const inputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleDoubleClick = () => {
    console.log('double click');
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current?.focus();
    }
  }, [isEditing]);

  return {
    handleBlur,
    handleDoubleClick,
    textareaRef,
    isEditing,
  };
};
