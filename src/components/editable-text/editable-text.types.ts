export type EditableTextProps = {
  id: string;
  data: { label: string; onchange: (id: string, val: string) => void };
  inputClassName?: string;
};
