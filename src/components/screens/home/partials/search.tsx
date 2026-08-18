import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

type SearchProps = {
    open: boolean;
    onClose: () => void;
};

const Search = ({ open, onClose }: SearchProps) => {
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const inputKeyDownHandler = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        if (event.code == 'Enter' && value) {
            navigate(`/shop?name=${value}`);
        }
    };

    const iconClickHandler = () => {
        if (value) {
            navigate(`/shop?name=${value}`);
        }
    };

    useEffect(() => {
        if (!open) return;

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', closeOnEscape);
        return () => document.removeEventListener('keydown', closeOnEscape);
    }, [open, onClose]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="جست‌وجو"
            onClick={onClose}
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-md transition-opacity duration-300 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className={`relative w-full transform transition-transform duration-300 ease-out md:!w-max ${open ? 'translate-y-0' : '-translate-y-[45vh]'
                    }`}
            >
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={inputKeyDownHandler}
                    type="text"
                    placeholder="کالای مورد نظر را جستجو کنید..."
                    className="border-neutral-03 h-14 w-full rounded-lg border py-2 pr-3 pl-12 outline-0 placeholder:text-white md:!w-[650px]"
                />
                <SearchIcon
                    onClick={iconClickHandler}
                    className="absolute top-4 left-3 cursor-pointer"
                />
            </div>
        </div>
    );
};

export default Search;
