import * as summarizer from 'text-summarization';

export class Summarizer {
  run(text: string) {
    return summarizer({ text });
  }
}
