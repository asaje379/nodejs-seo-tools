import { useParams } from 'react-router-dom';
import serpApi from '../api/requests/serp.api';
import { Layout } from '../components/layout/Layout';
import { useFetch } from '../hooks/useFetch';
import { Card, ListGroup } from 'flowbite-react';

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
      <>
      <ListGroup.Item>Page : {serpRank.pageNumber}</ListGroup.Item><ListGroup.Item>Position : {serpRank.index}</ListGroup.Item><ListGroup.Item>{serpRank.url}</ListGroup.Item>
      <Card
        horizontal
        // className='serp-rank-card'
        // imgAlt={serpRank.data?.imgAlt}
        // imgSrc={serpRank.data?.imgUrl}
        >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <div className="flex justify-start items-center gap-10">
            <img src={serpRank.data?.icon} alt="" />
            <p>
              <h1>{serpRank.data?.title}</h1>
              <h2 className='text-base'><a target='_blank' href={serpRank.data?.url}>{serpRank.data?.url}</a></h2>
            </p>
          </div>
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          <p>
          {serpRank.data?.paragraphe}
          </p>
        </p>
      </Card>
      </>
      :
      <ListGroup.Item>Not Found</ListGroup.Item>
      }
      </ListGroup>
      }
    </Layout>
  );
};
