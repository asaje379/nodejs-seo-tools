import { http } from '..';
import { Pagination } from './typings';

export type KeywordPayload = {
  text: string;
  stopwords?: string;
};

export default {
  async run(data: KeywordPayload) {
    await http.post('keyword/run', data);
  },

  async all(args?: Pagination) {
    const res = await http.get('keyword', args ? { params: args } : undefined);
    return res.data;
  },

  async one(id: string) {
    const res = await http.get('keyword/' + id);
    return res.data;
  },
};
