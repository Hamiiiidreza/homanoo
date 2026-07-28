import Container from '../../modules/container';
import Order from './partials/order';
import Main from './partials/main';
import Reviews from './partials/reviews';
import { Link, useParams } from 'react-router-dom';
import useProduct from '../../../endpoints/useProduct';
import ProductScreenSkeleton from './partials/product-screen-skeleton';
import { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { ChevronLeft } from 'lucide-react';

const ProductScreen = () => {
    const { code } = useParams();
    const { data, isPending, isError } = useProduct(Number(code));


    const [activeColor, setActiveColor] = useState<{
        code: string;
        name: string;
    } | null>(null);

    console.log('product', data);

    useEffect(() => {
        if (data?.colors[0]?.code) {
            setActiveColor(data?.colors[0]);
        }
    }, [data]);
    if (isError) {
        return (
            <Container>
                <div className="space-y-4 py-40">
                    <p className="text-center text-2xl">کالایی یافت نشد</p>
                    <Link to={'/shop'} className="mx-auto block w-max">
                        <Button variant={'mainShaded'}>
                            برگشت به فروشگاه <ChevronLeft />
                        </Button>
                    </Link>
                </div>
            </Container>
        );
    }
    return (
        <Container>
            <div className="py-5 sm:!py-10">
                {!isPending ? (
                    <>
                        <div className="flex flex-col gap-4 gap-y-8 lg:!flex-row">
                            <Main
                                activeColor={activeColor}
                                setActiveColor={setActiveColor}
                                data={data}
                            />
                            <Order activeColor={activeColor} data={data} />
                        </div>
                        <Reviews data={data} />
                    </>
                ) : (
                    <ProductScreenSkeleton />
                )}
            </div>
        </Container>
    );
};

export default ProductScreen;