import CategoryCard from './categories-card';
import CategoriesSkeleton from './categories-skeleton';

const Categories = ({ data }: { data: { slug: string }[] }) => {
  return data?.length > 0 && data ? (
    <>
      <section className="flex w-full flex-col flex-nowrap gap-6 md:flex-row">
        <div className="hidden md:!block md:w-1/2">
          <CategoryCard
            data={data?.find((c) => c.slug == 'bedRoom')}
            imageClass="!mix-blend-lighten"
            isTop={true}
          />
        </div>
        <div className="flex w-full flex-col gap-6 md:w-1/2">
          <div className="block w-full md:!hidden">
            <CategoryCard
              data={data?.find((c) => c.slug == 'bedRoom')}
              imageClass="!mix-blend-lighten"
              isTop={false}
            />
          </div>
          <CategoryCard
            data={data?.find((c) => c.slug == 'desk&console')}
            isTop={false}
            hasInnerLeftBorder={true}
          />
          <CategoryCard
            data={data?.find((c) => c.slug == 'lamps&chandeliers')}
            isTop={false}
            hasInnerLeftBorder={true}
          />
        </div>
      </section>
    </>
  ) : (
    <CategoriesSkeleton />
  );
};
export default Categories;
