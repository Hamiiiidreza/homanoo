import { useQuery } from '@tanstack/react-query';
import { useQueryParams } from './useQueryParams';
import { localBackendUrl } from '../utils/constants';

const useBlogs = () => {
    const { getParam } = useQueryParams();

    const fetchData = async () => {
        const params = new URLSearchParams();

        if (getParam('page') as string) {
            params.append('page', getParam('page') as string);
        }
        if (true) {
            params.append('limit', '4');
        }
        if (getParam('name') as string) {
            params.append('name', getParam('name') as string);
        }
        if (getParam('sortBy') as string) {
            params.append('sort', getParam('sortBy') as string);
        }

        const url = `${localBackendUrl}/articles${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    const { data, isPending } = useQuery({
        queryKey: [
            'blogs',
            getParam('name') as string,
            getParam('page') as string,
            getParam('sortBy') as string,
        ],
        queryFn: fetchData,
    });

    return { data, isPending };
};

export default useBlogs;
