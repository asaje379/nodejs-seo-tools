import { http } from '..';
import { Pagination } from './typings';

export default {
  async run(url: string) {
    await http.post('site-map/run', { url });
  },

  async all(args?: Pagination) {
    const res = await http.get(
      'site-map',
      args ? { params: args } : undefined,
    );
    return res.data;
  },

  async one(id: string) {
    const res = await http.get('site-map/' + id);
    return res.data;
  },
};
