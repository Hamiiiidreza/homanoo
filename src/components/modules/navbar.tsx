import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Badge from '../ui/badge';
import CartSidebar from './cart-sidebar';
import MobileMenu from './mobile-menu';
import NavUser from './authoritarian/nav-user';
import { Menu, ShoppingCartIcon, Search } from 'lucide-react';
import { useUser } from '../../ednpionts/useUser';

export enum Routes {
  HOME = '/',
  ABOUT = '/about-us',
  SHOP = '/Shop',
  ARTICLES = '/articles',
  CONTACT = '/contact-us',
};

type MenuItem = {
  name: string;
  path: string;
};

const Navbar = () => {
  const [menuItems] = useState<MenuItem[]>([
    { name: 'خانه', path: Routes.HOME },
    { name: 'درباره ما', path: Routes.ABOUT },
    { name: 'فروشگاه', path: Routes.SHOP },
    { name: 'مقالات', path: Routes.ARTICLES },
    { name: 'تماس با ما', path: Routes.CONTACT },
  ]);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [count, setCount] = useState<null | number>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const location = useLocation();
  const { data: user, isLoading } = useUser();
  const router = useNavigate()
  useEffect(() => {
    if (user) {
      setCount(user.cart.length)
    }
  }, [user])

  return (
    <div>
      <nav className="relative flex w-full items-center justify-between bg-white">
        <div className="flex items-center justify-center gap-2">
          <Menu onClick={() => setOpenMobileMenu(true)} className="md:hidden" size={24} />
          <Link to="/" className="font-VazirMedium text-base md:text-2xl leading-none py-4.5 overflow-hidden">
            <img src="./Images/logo-3.png" alt="" className='w-30 h-16 rounded-md overflow-hidden' />
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-8 py-4.5 font-VazirMedium text-sm relative right-8">
          {menuItems.map((menu: MenuItem) => (
            <li className="group" key={menu.path}>
              <Link
                to={menu.path}
                className={`transition-all hover:text-black ${location.pathname == menu.path ? 'text-neutral-07' : 'text-neutral-04'
                  }`}
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 py-4">
          <Link to='' className="hidden sm:block">
            <Search size={20} className='transition-all hover:drop-shadow-custom' />
          </Link>

          <div
            onClick={() => count ? setOpenCart(true) : router('/cart')}
            className="relative flex items-center cursor-pointer justify-center gap-2"
          >
            <ShoppingCartIcon />
            {count ? <Badge
              className="bg-red-600 absolute -top-2 -left-1 flex items-center justify-center rounded-full px-1.5 py-0.5 text-xs text-white"
              number={(Number(count)).toLocaleString('fa-IR')}
            /> : ''}
          </div>
          <NavUser user={user} isLoading={isLoading} />
        </div>
      </nav>

      <CartSidebar data={user} open={openCart} onClose={() => setOpenCart(false)} />
      <MobileMenu
        open={openMobileMenu}
        onClose={() => setOpenMobileMenu(false)}
      />
    </div>
  );
};

export default Navbar;


