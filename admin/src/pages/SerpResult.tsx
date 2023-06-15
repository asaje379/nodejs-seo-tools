import { useParams } from 'react-router-dom';
import serpApi from '../api/requests/serp.api';
import { Layout } from '../components/layout/Layout';
import { useFetch } from '../hooks/useFetch';

export const SerpResult = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(() => serpApi.one(id ?? ''), {});

  return (
    <Layout>
      <div className="font-semibold">Serp Result</div>
      {!loading && <div className="mt-6">{JSON.stringify(data)}</div>}
    </Layout>
  );
};
