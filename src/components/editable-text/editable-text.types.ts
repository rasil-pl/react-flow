export type EditableTextProps = {
  id: string;
  data: { label: string; isEditing?: boolean };
  type: 'node' | 'edge';
  inputClassName?: string;
};
