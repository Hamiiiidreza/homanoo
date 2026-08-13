import { Link } from 'react-router-dom';
import { BlogItem } from '../../types/blog.types';
import { localAssetsUrl } from '../../utils/constants';
import { toJalaliDate } from '../../utils/helpers';

const BlogCard = ({
  name,
  short_description,
  slug,
  image,
  createdAt,
}: BlogItem) => (
  <Link
    to={`/blogs/${slug}/${String(name).replaceAll(' ', '-')}`}
    className="bg-neutral-02 hover:bg-neutral-03 relative flex h-full cursor-pointer flex-col gap-4 rounded-xl pb-10 shadow transition-colors"
  >
    <img
      className="h-[200px] w-full rounded-t-xl bg-cover bg-center object-cover"
      src={localAssetsUrl + image}
      alt={name}
    />
    <div className="px-3 pb-4">
      <h3 className="leading-1.4 pb-3.5 font-semibold text-[#23262F] transition-all">
        {name}
      </h3>
      <p className="text-justify text-sm break-words">
        {short_description.slice(0, 100)}...
      </p>

      <p className="font-VazirRegular text-neutral-04 absolute bottom-4 left-4 pt-4 text-left text-xs leading-5 tracking-[0] transition-all">
        {toJalaliDate(createdAt)}
      </p>
    </div>
  </Link>
);

export default BlogCard;
