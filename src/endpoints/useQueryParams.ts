import { useSearchParams } from 'react-router-dom';

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue>;

export function useQueryParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const getParams = (): QueryParams => {
        const params: QueryParams = {};
        searchParams.forEach((value, key) => {
            if (value === 'true') params[key] = true;
            else if (value === 'false') params[key] = false;
            else if (!isNaN(Number(value)) && value !== '')
                params[key] = Number(value);
            else params[key] = value;
        });
        return params;
    };

    const getParam = (key: string): string | null => {
        return searchParams.get(key);
    };

    const setParams = (newParams: QueryParams, replace: boolean = false) => {
        const current = getParams();

        const merged = {
            ...current,
            ...newParams,
        };

        Object.keys(merged).forEach((key) => {
            if (merged[key] == null) {
                delete merged[key];
            }
        });

        const url = new URLSearchParams();

        Object.entries(merged).forEach(([key, value]) => {
            url.set(key, String(value));
        });

        setSearchParams(url, { replace });
    };

    const replaceParams = (newParams: QueryParams, replace = false) => {
        const url = new URLSearchParams();

        Object.entries(newParams).forEach(([key, value]) => {
            if (value != null) {
                url.set(key, String(value));
            }
        });

        setSearchParams(url, { replace });
    };

    const clearParams = (replace: boolean = false) => {
        setSearchParams({}, { replace });
    };

    return {
        searchParams,
        replaceParams,
        getParams,
        getParam,
        setParams,
        clearParams,
    };
}