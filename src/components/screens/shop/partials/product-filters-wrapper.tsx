import { useState } from 'react';
import { Filter } from 'lucide-react';
import { useMediaQuery } from '../../../../endpoints/useMediaQuery';
import { Button } from '../../../ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../../../ui/drawer';
import ProductFilterContent from './product-filter-content';
import { useProductFilters } from '../../../../store/product-filter';
import { ShopFiltersData } from '../../../../types/shop';

type Props = {
    filtersData: ShopFiltersData;
};

export default function ProductFiltersWrapper({ filtersData }: Props) {
    const isDesktop = useMediaQuery('(min-width:768px)');
    const [open, setOpen] = useState(false);

    const filters = useProductFilters((state) => state.filters);

    const activeFiltersCount = [
        filters.category !== 'all',
        filters.sortBy !== 'all',
        filters.color !== 'all',
        filters.inStock,
        filters.priceRange[0] !== filtersData?.minPrice ||
        filters.priceRange[1] !== filtersData?.maxPrice,
    ].filter(Boolean).length;

    if (isDesktop) {
        return (
            <div className="bg-background sticky top-4 h-fit min-w-[230px] rounded-lg border p-4 lg:min-w-[280px]">
                <h3 className="mb-4 text-lg font-bold">فیلتر محصولات</h3>

                <ProductFilterContent
                    filtersData={filtersData}
                    closeDrawer={() => setOpen(false)}
                />
            </div>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="w-full gap-2">
                    <Filter className="h-4 w-4" />
                    فیلترها
                    {activeFiltersCount > 0 && (
                        <span className="bg-main mr-auto flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
                            {activeFiltersCount}
                        </span>
                    )}
                </Button>
            </DrawerTrigger>

            <DrawerContent className="max-h-[90vh]">
                <DrawerHeader>
                    <DrawerTitle className="text-center">فیلتر محصولات</DrawerTitle>
                </DrawerHeader>

                <div className="flex-1 overflow-y-auto px-4">
                    <ProductFilterContent
                        filtersData={filtersData}
                        closeDrawer={() => setOpen(false)}
                    />
                </div>

                <DrawerFooter className="border-t pt-4">
                    <Button onClick={() => setOpen(false)}>اعمال فیلترها</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
