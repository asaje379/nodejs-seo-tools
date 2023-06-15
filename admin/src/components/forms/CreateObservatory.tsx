import { ChangeEvent, FormEvent, useState } from 'react';
import { CreateProps } from './typings';
import observatoryApi from '../../api/requests/observatory.api';
import { Button, TextInput } from 'flowbite-react';

export const CreateObservatory = ({ onSubmit }: CreateProps) => {
  const [url, setUrl] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await observatoryApi.run(url);

    setUrl('');
    if (onSubmit) onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 grid grid-cols-[1fr_auto] gap-3">
      <TextInput
        value={url}
        onChange={handleChange}
        placeholder="Enter a web page URL"
      />
      <Button type="submit">Analyze</Button>
    </form>
  );
};
