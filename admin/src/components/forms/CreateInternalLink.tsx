import { Button, TextInput, Select } from 'flowbite-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import internalLinkApi from '../../api/requests/internallink.api';

type Props = {
  onSubmit?: () => void;
};
export const CreateInternalLink = ({ onSubmit }: Props) => {
  const [url, setUrl] = useState('');
  const [nbre, setNbre] = useState(1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await internalLinkApi.run(url, nbre);

    setUrl('');
    if (onSubmit) onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 flex gap-3">
      <TextInput
        className="flex-grow"
        value={url}
        onChange={handleChange}
        placeholder="Enter a web page URL"
      />
      <Select
        defaultValue={1}
        placeholder="depth"
        onChange={(event) => setNbre(+event.target.value)}>
        {[1, 2].map((item) => (
          <option key={item}>{item}</option>
        ))}
      </Select>
      <Button type="submit">Analyze</Button>
    </form>
  );
};
