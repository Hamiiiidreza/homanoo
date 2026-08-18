import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Badge from '../ui/badge';
import CartSidebar from './cart-sidebar';
import MobileMenu from './mobile-menu';
import NavUser from './authoritarian/nav-user';
import { SearchIcon, ShoppingCartIcon } from 'lucide-react';
import { useUser } from '../../endpoints/useUser';
import Search from '../screens/home/partials/search';

type MenuItem = {
  name: string;
  path: string;
};

const Navbar = () => {
  const [menuItems] = useState<MenuItem[]>([
    { name: 'خانه', path: '/' },
    { name: 'درباره ما', path: '/about-us' },
    { name: 'فروشگاه', path: '/shop' },
    { name: 'مقالات', path: '/blogs' },
    { name: 'تماس با ما', path: '/contact-us' },
  ]);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [count, setCount] = useState<null | number>(null);
  const location = useLocation();
  const { data: user, isLoading } = useUser();
  const router = useNavigate();
  useEffect(() => {
    if (user) {
      setCount(user.cart.length);
    }
  }, [user]);

  return (
    <div>
      <nav className="relative flex w-full items-center justify-between bg-white">
        <div className="flex items-center justify-center gap-2">
          <MobileMenu />
          <Link to={'/'}>
            <img className="h-9" src="/Images/logo.jpg" alt="" />
          </Link>
        </div>

        <ul className="hidden items-center gap-10 py-4.5 text-sm md:flex">
          {menuItems.map((menu: MenuItem) => (
            <li className="group" key={menu.path}>
              <Link
                to={menu.path}
                className={`transition-all hover:text-black ${location.pathname == menu.path
                    ? 'text-neutral-07'
                    : 'text-neutral-04'
                  }`}
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 py-4">
          {location.pathname === '/' && (
            <button
              type="button"
              aria-label="جست‌وجو"
              onClick={() => setOpenSearch(true)}
              className="flex cursor-pointer items-center justify-center"
            >
              <SearchIcon />
            </button>
          )}
          <div
            onClick={() => (count ? setOpenCart(true) : router('/cart'))}
            className="relative flex cursor-pointer items-center justify-center gap-2"
          >
            <ShoppingCartIcon />
            {count ? (
              <Badge
                className="absolute -top-2 -left-1 flex items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-xs text-white"
                number={Number(count).toLocaleString('fa-IR')}
              />
            ) : (
              ''
            )}
          </div>
          <NavUser user={user} isLoading={isLoading} />
        </div>
      </nav>

      <CartSidebar
        data={user}
        open={openCart}
        onClose={() => setOpenCart(false)}
      />
      {location.pathname === '/' && (
        <Search open={openSearch} onClose={() => setOpenSearch(false)} />
      )}
    </div>
  );
};

export default Navbar;



