import { useQuery } from '@tanstack/react-query';
import { localBackendUrl } from '../utils/constants';

const fetchData = async () => {
    const response = await fetch(`${localBackendUrl}/locations`);
    const data = await response.json();
    return data;
};

const useLocation = () => {
    const { data, isPending } = useQuery({
        queryKey: ['location'],
        queryFn: fetchData,
    });

    return { data, isPending };
};

export default useLocation;
