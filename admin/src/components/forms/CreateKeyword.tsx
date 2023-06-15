import { ChangeEvent, FormEvent, useState } from 'react';
import { CreateProps } from './typings';
import keywordApi from '../../api/requests/keyword.api';
import { Button, TextInput, Textarea } from 'flowbite-react';

export const CreateKeyword = ({ onSubmit }: CreateProps) => {
  const [text, setText] = useState('');
  const [stopwords, setStopwords] = useState('');

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleStopwordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStopwords(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await keywordApi.run({ text, stopwords });

    setText('');
    setStopwords('');
    if (onSubmit) onSubmit();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 flex flex-col gap-6">
      <Textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter your text content"
      />
      <TextInput
        value={stopwords}
        onChange={handleStopwordChange}
        placeholder="Stop words (comma seperated)"
      />
      <Button type="submit">Analyze</Button>
    </form>
  );
};
