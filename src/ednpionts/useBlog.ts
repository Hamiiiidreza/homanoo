import { useQuery } from '@tanstack/react-query';
import { localBackendUrl } from '../utils/constants';
import { useParams } from 'react-router-dom';

const fetchData = async (slug: String) => {
  const url = `${localBackendUrl}/articles/${slug}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const useBlog = () => {
  const { slug } = useParams();
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => fetchData(String(slug)),
  });
};

export default useBlog;

