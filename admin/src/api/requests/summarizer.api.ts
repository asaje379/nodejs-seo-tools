import { http } from '..';
import { Pagination } from './typings';

export default {
  async run(text: string) {
    await http.post('summarizer/run', { text });
  },

  async all(args?: Pagination) {
    const res = await http.get(
      'summarizer',
      args ? { params: args } : undefined,
    );
    return res.data;
  },

  async one(id: string) {
    const res = await http.get('summarizer/' + id);
    return res.data;
  },
};
