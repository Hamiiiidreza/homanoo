import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { IoMdClose } from 'react-icons/io';
import { useQueryParams } from '../../../../endpoints/useQueryParams';

type Props = {
    className?: string;
    trashClassName?: string;
    debounceMs?: number;
    closeDrawer?: () => void;
};

const SearchInput = ({
    className,
    trashClassName,
    debounceMs = 600,
    closeDrawer,
}: Props) => {
    const { getParam, setParams } = useQueryParams();

    const [search, setSearch] = useState((getParam('name') as string) || '');

    const [debouncedValue] = useDebounce(search, debounceMs);

    useEffect(() => {
        const currentName = getParam('name') || '';
        const trimmed = debouncedValue.trim();

        if (trimmed === currentName.trim()) return;

        setParams({
            name: trimmed || null,
            page: null,
        });
        closeDrawer?.();
    }, [debouncedValue]);

    useEffect(() => {
        const urlName = (getParam('name') as string) || '';
        if (urlName !== search) {
            setSearch(urlName);
        }
    }, [getParam('name')]);

    useEffect(() => {
        const currentName = getParam('name') || '';
        if (currentName) setSearch(currentName as string);
    }, []);

    return (
        <div
            className={`${className} relative z-10 mb-2 flex w-full items-center gap-2 rounded-2xl`}
        >
            <input
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                type="text"
                autoComplete="off"
                placeholder={'اسم محصول...'}
                className="w-full rounded-lg border border-neutral-200 !bg-white !py-2 !pr-3 !pl-7 text-sm text-black !ring-0 outline-none placeholder:!text-[#999999]"
            />

            {search ? (
                <IoMdClose
                    className={`${trashClassName} absolute top-2.5 left-2 cursor-pointer`}
                    onClick={() => {
                        setSearch('');
                    }}
                />
            ) : (
                ''
            )}
        </div>
    );
};

export default SearchInput;