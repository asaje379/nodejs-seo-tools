import { Button, TextInput, Tooltip } from 'flowbite-react';
import { FormEvent, useState } from 'react';
import serpApi from '../../api/requests/serp.api';

type Props = {
  onSubmit?: () => void;
};
export const CreateSerp = ({ onSubmit }: Props) => {
  const [url, setUrl] = useState('');
  const [keyword, setKeyword] = useState('');
  const [maxResult, setMaxResult] = useState(100);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await serpApi.run(url, keyword, maxResult);

    setUrl('');
    setKeyword('');
    setMaxResult(0);
    if (onSubmit) onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 flex gap-3">
      <TextInput
      className="flex-grow"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a domain"
      />
      <TextInput
      className="flex-grow"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter a keyword"
      />
      <Tooltip
        content="Search in at most. The higher the number, the longer the search will take (recommended: 100)"
        style="light"
      >
        <TextInput
        className="flex-grow"
        value={maxResult}
        type='number'
        onChange={(e) => setMaxResult(Number(e.target.value))}
        placeholder="Enter a max search result"
      />
      </Tooltip>
      <Button type="submit">Analyze</Button>
    </form>
  );
};
