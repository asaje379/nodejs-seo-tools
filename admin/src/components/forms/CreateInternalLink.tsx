import { Button, TextInput, Dropdown } from 'flowbite-react';
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
      <Dropdown value={nbre} label={nbre}>
        <Dropdown.Item onClick={() => setNbre(1)}>
          1
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setNbre(2)}>
          2
        </Dropdown.Item>
      </Dropdown>
      <Button type="submit">Analyze</Button>
    </form>
  );
};
