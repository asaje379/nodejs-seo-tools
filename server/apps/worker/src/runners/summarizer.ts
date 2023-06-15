import * as summarizer from 'text-summarization';

export class Summarizer {
  async run(text: string) {
    return await summarizer({ text });
  }
}
