import { ChangeEvent, FormEvent, useState } from 'react';
import { CreateProps } from './typings';
import extractorApi, {
  SoupExtractorKind,
} from '../../api/requests/extractor.api';
import { Button, Checkbox, TextInput } from 'flowbite-react';

export const CreateExtractor = ({ onSubmit }: CreateProps) => {
  const [url, setUrl] = useState('');
  const [options, setOptions] = useState<SoupExtractorKind[]>([
    'HEADERS',
    'IMAGES',
    'LINKS',
  ]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleCheckboxChange = (
    e: ChangeEvent<HTMLInputElement>,
    value: SoupExtractorKind,
  ) => {
    const checked = e.target.checked;

    if (checked) {
      setOptions([...new Set([...options, value])]);
      return;
    }

    setOptions(options.filter((it) => it !== value));
  };

  console.log(options);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await extractorApi.run({ url, options });

    setUrl('');
    if (onSubmit) onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 flex flex-col gap-6">
      <TextInput
        value={url}
        onChange={handleChange}
        placeholder="Website URL"
      />
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <label htmlFor="headers">HEADERS</label>
          <Checkbox
            id="headers"
            defaultChecked
            onChange={(e) => handleCheckboxChange(e, 'HEADERS')}
          />
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="images">IMAGES</label>
          <Checkbox
            id="images"
            defaultChecked
            onChange={(e) => handleCheckboxChange(e, 'IMAGES')}
          />
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="links">LINKS</label>
          <Checkbox
            id="links"
            defaultChecked
            onChange={(e) => handleCheckboxChange(e, 'LINKS')}
          />
        </div>
      </div>
      <Button type="submit">Run Extraction</Button>
    </form>
  );
};
