import * as summarizer from 'text-summarization';

export type SummarizerArgs = {
  text?: string;
  html?: string;
};
export class Summarizer {
  run(args: SummarizerArgs) {
    return summarizer(args);
  }
}
