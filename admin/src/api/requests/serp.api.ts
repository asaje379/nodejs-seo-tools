import { http } from '..';
import { Pagination } from './typings';

export default {
  async run(url: string, keyword: string) {
    await http.post('serp/run', { url, keyword });
  },

  async all(args?: Pagination) {
    const res = await http.get(
      'serp',
      args ? { params: args } : undefined,
    );
    return res.data;
  },

  async one(id: string) {
    const res = await http.get('serp/' + id);
    return res.data;
  },
};
