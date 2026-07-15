import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartSidebar from '../cart-sidebar/cart-sidebar';
import MobileMenu from '../mobile-menu/mobile-menu';
import { ShoppingCart, Search } from 'lucide-react';
import { Button } from "../../ui/button";
import AuthForm from '../../templates/auth-form/auth-form';

export enum Routes {
  HOME = '/',
  ABOUT = '/about-us',
  SHOP = '/Shop',
  ARTICLES = '/articles',
  CONTACT = '/contact-us',
};

type MenuItem = {
  name: string;
  path: Routes;
};

const Navbar: React.FC = () => {
  const [menuItems] = useState<MenuItem[]>([
    { name: 'خانه', path: Routes.HOME },
    { name: 'درباره ما', path: Routes.ABOUT },
    { name: 'فروشگاه', path: Routes.SHOP },
    { name: 'مقالات', path: Routes.ARTICLES },
    { name: 'تماس با ما', path: Routes.CONTACT },
  ]);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const location = useLocation();

  const isActive = (path: Routes): boolean => {
    if (!path) return false;
    if (path === Routes.HOME) return location.pathname === Routes.HOME;
    return location.pathname.startsWith(path);
  };

  return (
    <div>
      <nav className="w-full bg-white flex items-center justify-between relative">
        <div className="flex items-center justify-center gap-1">
          {/* Hamburger – mobile only */}
          <button
            className="md:hidden"
            onClick={() => setOpenMobileMenu(true)}
          >
            <img
              src="/Images/menu-line-horizontal.svg"
              alt="menu"
              className="size-6 bg-cover bg-center"
            />
          </button>

          <Link to="/" className="font-VazirMedium text-base md:text-2xl leading-none py-4.5 overflow-hidden">
            <img src="./Images/logo-3.png" alt="" className='w-30 h-16 rounded-md overflow-hidden' />
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-8 py-4.5 font-VazirMedium text-sm relative right-8">
          {menuItems.map((menu: MenuItem) => (
            <li className="group" key={menu.path}>
              <Link
                to={menu.path}
                className={`hover:text-black transition-all
                     ${isActive(menu.path) ? 'text-neutral-07' : 'text-neutral-04'
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

          <div className="flex items-center justify-center gap-2 relative">
            <button onClick={() => setOpenCart(true)} className="relative">
              <ShoppingCart className='cursor-pointer transition-all hover:drop-shadow-custom' />
              <span className="absolute -top-2 -left-2
                             bg-red-500 text-white text-xs
                              rounded-full w-5 h-5 flex items-center justify-center transition-all hover:drop-shadow-custom">
                2
              </span>
            </button>
          </div>
          <button
            onClick={() => setOpenAuthModal(true)}
            className="hidden sm:block"
          >
            <Button className="flex items-center justify-center font-VazirMedium text-sm text-main px-4 h-9 bg-neutral-02 rounded-sm hover:bg-main hover:text-white transition-colors cursor-pointer">
              ورود / ثبت نام
            </Button>
          </button>

          <AuthForm
            open={openAuthModal}
            onOpenChange={setOpenAuthModal}
          />
        </div>
      </nav>

      <CartSidebar open={openCart} onClose={() => setOpenCart(false)} />
      <MobileMenu open={openMobileMenu} onClose={() => setOpenMobileMenu(false)} />
    </div>
  );
}

export default Navbar;


