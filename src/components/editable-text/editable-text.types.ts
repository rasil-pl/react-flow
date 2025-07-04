export type EditableTextProps = {
  id: string;
  data: { label: string };
  type: 'node' | 'edge';
  inputClassName?: string;
};
