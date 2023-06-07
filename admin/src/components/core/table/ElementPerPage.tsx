import { Select } from 'flowbite-react';

type Props = {
  value?: number;
  onChange?: (value: number) => void;
};

export const ElementPerPage = ({ value, onChange = (v) => v }: Props) => {
  return (
    <div className="min-w-[120px]">
      <Select
        defaultValue={value}
        placeholder="Elts/page"
        onChange={(event) => onChange(+event.target.value)}>
        {[5, 10, 25, 50, 100, 250].map((item) => (
          <option key={item}>{item}</option>
        ))}
      </Select>
    </div>
  );
};
