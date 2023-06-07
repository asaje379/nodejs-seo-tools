import { useParams } from 'react-router-dom';
import lighthouseApi from '../api/requests/lighthouse.api';
import { BackTitle } from '../components/core/BackTitle';
import { Layout } from '../components/layout/Layout';
import { useFetch } from '../hooks/useFetch';

export const LighthouseResult = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(() => lighthouseApi.one(id ?? ''), {});

  return (
    <Layout>
      <BackTitle>LighthouseResult</BackTitle>
      {!loading && <div className="mt-6">{JSON.stringify(data)}</div>}
    </Layout>
  );
};
