import { useState } from 'react';
import { Icon } from './Icon';

type Props = {
  value: string;
};

export const Copy = ({ value }: Props) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <div
      className="flex items-center gap-2 border border-black-500 rounded-xl w-fit px-2 cursor-pointer"
      onClick={copy}>
      <Icon
        name={copied ? 'done' : 'content_copy'}
        size={12}
      />
      <div>{copied ? 'Copied' : 'Copy'}</div>
    </div>
  );
};
