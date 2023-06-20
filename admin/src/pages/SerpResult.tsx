import { useParams } from 'react-router-dom';
import serpApi from '../api/requests/serp.api';
import { Layout } from '../components/layout/Layout';
import { useFetch } from '../hooks/useFetch';
import { ListGroup } from 'flowbite-react';

export const SerpResult = () => {
  const { id } = useParams();
  const { data, loading } = useFetch<{task: {result: {result: any}}}>(() => serpApi.one(id ?? ''), {});
  let serpRank: any = {};
  if (data) {
    serpRank = data['task']['result']['result'];
  }
  
  return (
    <Layout>
      <div className="font-semibold">Serp Result</div>
      {!loading && 
      <ListGroup>
      {serpRank.index !== -1 ?
      <><ListGroup.Item>Page : {serpRank.pageNumber}</ListGroup.Item><ListGroup.Item>Position : {serpRank.index}</ListGroup.Item><ListGroup.Item>{serpRank.url}</ListGroup.Item></>
      :
      <ListGroup.Item>Not Found</ListGroup.Item>
      }
      </ListGroup>
      }
    </Layout>
  );
};
