import { http } from '..';
import { Pagination } from './typings';

export default {
  async run(url: string, nbre: number) {
    await http.post('internal-link/run', { url, nbre });
  },

  async all(args?: Pagination) {
    const res = await http.get(
      'internal-link',
      args ? { params: args } : undefined,
    );
    return res.data;
  },

  async one(id: string) {
    const res = await http.get('internal-link/' + id);
    return res.data;
  },
};
