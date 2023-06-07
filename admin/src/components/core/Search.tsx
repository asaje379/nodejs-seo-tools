import { ChangeEvent, useRef } from 'react';
import { Icon } from './Icon';

type Props = {
  onSearch: (value: string) => void;
  value?: string;
};

export const Search = ({ onSearch, value }: Props) => {
  const inputValue = useRef(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTimeout(() => {
      if (
        inputValue &&
        inputValue.current &&
        (inputValue.current as HTMLInputElement).value === val
      ) {
        onSearch(val);
      }
    }, 1000);
  };

  return (
    <div className="flex items-center gap-1 px-2 border border-gray-300 bg-gray-50 rounded-lg">
      <Icon
        size={18}
        name="search"
      />
      <input
        type="text"
        ref={inputValue}
        {...(value ? { defaultValue: value } : {})}
        className="w-full border-none focus:border-transparent focus:ring-0 outline-none text-gray-900 bg-transparent"
        placeholder="Search"
        onChange={handleSearch}
      />
    </div>
  );
};
