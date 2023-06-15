import { Button, TextInput } from 'flowbite-react';
import { FormEvent, useState } from 'react';
import serpApi from '../../api/requests/serp.api';

type Props = {
  onSubmit?: () => void;
};
export const CreateSerp = ({ onSubmit }: Props) => {
  const [url, setUrl] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await serpApi.run(url, keyword);

    setUrl('');
    setKeyword('');
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
      <Button type="submit">Analyze</Button>
    </form>
  );
};
