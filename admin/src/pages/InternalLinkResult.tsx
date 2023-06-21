import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useFetch } from '../hooks/useFetch';
import internallinkApi from '../api/requests/internallink.api';
import Tree from '../../node_modules/react-d3-tree';

export const InternalLinkResult = () => {
  const { id } = useParams();
  const { data } = useFetch<{ task: { result: { result: any } } }>(
    () => internallinkApi.one(id ?? ''),
    {},
  );
  let orgChart = {};
  if (data) {
    orgChart = data['task']['result']['result'];
  }

  const onHandlerFunction = (data: any) => {
    console.log(data);
  };

  return (
    <Layout>
      {/* <div className="font-semibold">Internal Link Result</div>
      {!loading && <div className="mt-6">{JSON.stringify(data)}</div>} */}
      <div
        id="treeWrapper"
        style={{ width: '100%', height: '100vh' }}>
        <Tree
          onLinkClick={() => onHandlerFunction('test')}
          data={orgChart as any}
        />
      </div>
    </Layout>
  );
};
