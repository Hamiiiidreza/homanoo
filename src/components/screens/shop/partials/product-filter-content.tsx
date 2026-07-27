import { X } from 'lucide-react';
import SearchInput from './search-input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../ui/select';
import { Slider } from '../../../ui/slider';
import { Skeleton } from '../../../ui/skeleton';
import { Button } from '../../../ui/button';
import { useFilterActions } from './hook';
import { ShopFiltersData } from '../../../../types/shop';

type Props = {
    closeDrawer: () => void;
    filtersData: ShopFiltersData;
};

export default function ProductFilterContent({
    filtersData,
    closeDrawer,
}: Props) {
    const { filters, update, reset } = useFilterActions(filtersData, closeDrawer);

    return (
        <div className="flex flex-col gap-6 p-1">
            <div className="space-y-2">
                <SearchInput closeDrawer={closeDrawer} />

                <div className="pt-2">
                    <label>دسته‌بندی</label>

                    <Select
                        value={filters.category}
                        onValueChange={(value) =>
                            update({
                                category: value,
                            })
                        }
                    >
                        <SelectTrigger className="mt-2 w-full">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent dir="rtl">
                            <SelectItem value="all">همه</SelectItem>

                            {filtersData?.categories?.map((category) => (
                                <SelectItem key={category._id} value={category.slug}>
                                    {category.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <label>مرتب سازی</label>

                <Select
                    value={filters.sortBy}
                    onValueChange={(value) =>
                        update({
                            sortBy: value,
                        })
                    }
                >
                    <SelectTrigger className="mt-2 w-full">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent dir="rtl">
                        <SelectItem value="all">همه</SelectItem>

                        <SelectItem value="-star">محبوب‌ترین</SelectItem>

                        <SelectItem value="-createdAt">جدیدترین</SelectItem>

                        <SelectItem value="createdAt">قدیمی‌ترین</SelectItem>

                        <SelectItem value="price">قیمت کم به زیاد</SelectItem>

                        <SelectItem value="-price">قیمت زیاد به کم</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-3">
                <label className="block">محدوده قیمت</label>

                {filtersData ? (
                    <>
                        <Slider
                            min={filtersData.minPrice}
                            max={filtersData.maxPrice}
                            step={10}
                            value={filters.priceRange}
                            onValueChange={(value) =>
                                update({
                                    priceRange: value,
                                })
                            }
                        />

                        <div className="text-muted-foreground flex justify-between text-sm">
                            <p>{filters?.priceRange[1]?.toLocaleString()}</p>

                            <p>{filters?.priceRange[0]?.toLocaleString()}</p>
                        </div>
                    </>
                ) : (
                    <Skeleton className="h-10" />
                )}
            </div>

            <div className="space-y-2">
                <label>رنگ</label>

                <Select
                    value={filters.color}
                    onValueChange={(value) =>
                        update({
                            color: value,
                        })
                    }
                >
                    <SelectTrigger className="mt-2 w-full">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent dir="rtl">
                        <SelectItem value="all">همه</SelectItem>

                        {filtersData?.colors.map((color) => (
                            <SelectItem key={color} value={color}>
                                {color}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-center">
                <input
                    id="inStock"
                    type="checkbox"
                    className="accent-main"
                    checked={filters.inStock}
                    onChange={(e) =>
                        update({
                            inStock: e.target.checked,
                        })
                    }
                />

                <label htmlFor="inStock" className="cursor-pointer pr-2 text-sm">
                    فقط محصولات موجود
                </label>
            </div>

            <Button variant="danger" onClick={reset}>
                <X className="ml-2 h-4 w-4" />
                حذف همه فیلترها
            </Button>
        </div>
    );
}
