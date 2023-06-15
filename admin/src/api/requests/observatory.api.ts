import { http } from '..';
import { Pagination } from './typings';

export default {
  async run(url: string) {
    await http.post('observatory/run', { url });
  },

  async all(args?: Pagination) {
    const res = await http.get(
      'observatory',
      args ? { params: args } : undefined,
    );
    return res.data;
  },

  async one(id: string) {
    const res = await http.get('observatory/' + id);
    return res.data;
  },
};
