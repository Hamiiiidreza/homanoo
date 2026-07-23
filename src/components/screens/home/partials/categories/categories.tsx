import CategoryCard from "./categories-card";
import CategoriesSkeleton from "./categories-skeleton";

const Categories = ({ data }: {
  data: {
    description: string,
    image: string,
    isActive: boolean,
    name: string,
    slug: string
  }[]
}) => (
  data?.length > 0 && data[0] ?
    <>
      <section className="w-full bg-white flex flex-nowrap flex-col md:flex-row gap-6">
        <div className="md:w-1/2 md:!block hidden">
          <CategoryCard
            data={data[0]}
            imageClass="!mix-blend-lighten"
            isTop={true}
          />
        </div>
        <div className="md:w-1/2 w-full flex flex-col gap-6">
          <div className="md:!hidden block w-full">
            <CategoryCard
              data={data[0]}
              imageClass="!mix-blend-lighten"
              isTop={false}
            />
          </div>
          {data?.slice(1, 3).map(ct => (
            <CategoryCard
              key={ct.slug}
              data={ct}
              isTop={false}
              hasInnerLeftBorder={true}
            />
          ))}
        </div>
      </section>

    </>
    : <CategoriesSkeleton />

);

export default Categories;
