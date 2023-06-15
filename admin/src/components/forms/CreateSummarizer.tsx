import { ChangeEvent, FormEvent, useState } from 'react';
import { CreateProps } from './typings';
import { Button, Textarea } from 'flowbite-react';
import summarizeApi from '../../api/requests/summarizer.api';

export const CreateSummarizer = ({ onSubmit }: CreateProps) => {
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await summarizeApi.run(text);

    setText('');
    if (onSubmit) onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2">
      <Textarea
        value={text}
        onChange={handleChange}
        placeholder="Enter your content"
        rows={5}
      />
      <Button
        className="mt-4"
        type="submit">
        Generate summarized version
      </Button>
    </form>
  );
};
