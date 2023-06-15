import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useFetch } from '../hooks/useFetch';
import sitemapApi from '../api/requests/sitemap.api';
import { ListGroup } from 'flowbite-react';

export const SitemapResult = () => {
  const { id } = useParams();
  const { data, loading } = useFetch<{task: {result:{result: any}}}>(() => sitemapApi.one(id ?? ''), {});
  let siteMap: string[] = [];
  if (data) {
    siteMap = data['task']['result']['result'].map((el: {loc: string[]}) => el.loc[0]);
  }
  return (
    <Layout>
      <div className="font-semibold">Sitemap Result</div>
      {!loading &&
      <ListGroup>
      {siteMap.map((el: string) => (<ListGroup.Item key={el} target="_blank" href={el}>{el}</ListGroup.Item>))}
    </ListGroup>
      }
    </Layout>
  );
};
