import { localBackendUrl } from '../utils/constants';
import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
    const response = await fetch(`${localBackendUrl}/landing`);
    const data = await response.json();
    return data;
};

const useLanding = () => {
    const { data } = useQuery({
        queryKey: ['landing'],
        queryFn: fetchData,
    });

    return { data };
};

export default useLanding;