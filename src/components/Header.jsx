import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '../assets/Dorewa Logo.svg';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropdown from './Dropdown';
import SignupDropdown from './Auth/SignupDropdown';

const navigation = [
  { name: 'Home', href: '/' },
  // { name: 'Consultations', href: '/calculator' },
  // { name: 'Knowledge Base', href: '/posts' },
  // { name: 'Donate', href: '/donation' },
];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  // const [active, setActive] = useState(-1);
  const location = useLocation();

  return (
    <header className='bg-[#002400]'>
      <nav
        className='mx-auto flex max-w-[90rem] items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        <div className='flex lg:flex-1'>
          <NavLink to='/' className='-m-1.5 p-1.5'>
            <span className='sr-only'>Your Company</span>
            <img className='h-8 w-auto' src={Logo} alt='' />
          </NavLink>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={classNames(
                location.pathname === item.href
                  ? 'text-[#a8f48e] underline'
                  : 'text-white',
                'text-sm font-normal leading-6  hover:text-[#a2ec89] hover:underline  '
              )}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        {!user ? (
          <div className='hidden lg:flex lg:flex-1 lg:justify-end gap-3'>
            <SignupDropdown />
            <NavLink
              to='/auth/login'
              className='text-sm font-semibold leading-6 text-white'
            >
              Log in
            </NavLink>
          </div>
        ) : (
          <div className='hidden lg:flex lg:flex-1 lg:justify-end gap-3'>
            <Dropdown user={user} />
          </div>
        )}
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-10' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-green-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10'>
          <div className='flex items-center justify-between'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Dorewa</span>
              <img className='h-8 w-auto' src={Logo} alt='' />
            </a>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-400'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/25'>
              <div className='space-y-2 py-6'>
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800'
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className=''>
                <Link
                  to='/auth/signup'
                  className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800'
                >
                  Signup
                </Link>
              </div>
              <div className='pt-2'>
                <Link
                  to='/auth/login'
                  className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800'
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
