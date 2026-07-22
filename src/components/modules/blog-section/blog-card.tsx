import { Link } from 'react-router-dom';
import { BlogItem } from '../../../types/blog.types';
import { localAssetsUrl } from '../../../utils/constants';
import { toJalaliDate } from '../../../utils/helpers';

const BlogCard = ({
  name,
  short_description,
  slug,
  image,
  createdAt,
}: BlogItem) => (
  <Link
    to={`/blogs/${slug}/${String(name).replaceAll(' ', '-')}`}
    className="bg-neutral-02 hover:bg-neutral-03 flex cursor-pointer flex-col gap-4 rounded-xl shadow transition-colors"
  >
    <img
      className="h-[200px] w-full rounded-t-xl bg-cover bg-center object-cover"
      src={localAssetsUrl + image}
      alt={name}
    />
    <div className="px-3 pb-4">
      <h3 className="leading-1.4 mb-2 text-xl text-[#23262F] transition-all">
        {name}
      </h3>
      <p className="text-justify text-sm break-words">{short_description}</p>

      <p className="font-VazirRegular text-neutral-04 pt-4 text-left text-xs leading-5 tracking-[0] transition-all">
        {toJalaliDate(createdAt)}
      </p>
    </div>
  </Link>
);

export default BlogCard;
