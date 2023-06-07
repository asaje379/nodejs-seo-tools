import { Button, TextInput } from 'flowbite-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import lighthouseApi from '../../api/requests/lighthouse.api';

type Props = {
  onSubmit?: () => void;
};
export const CreateLighthouse = ({ onSubmit }: Props) => {
  const [url, setUrl] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await lighthouseApi.run(url);

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
