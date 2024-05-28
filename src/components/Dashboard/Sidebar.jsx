/* eslint-disable react/prop-types */
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  // CurrencyDollarIcon,
  Cog6ToothIcon,
  // DocumentDuplicateIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  //   MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/Dorewa Logo.svg';
import Background from '../../assets/Vector.svg';
import { useDispatch } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';

const navigation = [
  // { name: 'Home', href: '/admin', icon: HomeIcon, current: true },
  {
    name: 'Patients',
    href: '/dashboard/patients',
    icon: UsersIcon,
    current: false,
  },
  {
    name: 'Consultations',
    href: '/dashboard/consultations',
    icon: ClipboardDocumentListIcon,
    current: false,
  },
];

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState('/dashboard');

  const location = useLocation();

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-50 lg:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-gray-900/80' />
            </Transition.Child>

            <div className='fixed inset-0 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative mr-16 flex w-full max-w-xs flex-1'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                      <button
                        type='button'
                        className='-m-2.5 p-2.5'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-[#002400] px-6 pb-4 ring-1 ring-white/10'>
                    <div className='flex h-16 shrink-0 items-center'>
                      <img
                        src={Background}
                        className='absolute inset-0 z-0 h-full w-full object-cover'
                      />
                      <Link className='z-20' to={'/'}>
                        <img
                          className='h-8 w-auto z-50 cursor-pointer'
                          src={Logo}
                          alt='Your Company'
                        />
                      </Link>
                    </div>
                    <nav className='flex flex-1 flex-col z-10'>
                      <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                        <li>
                          <ul role='list' className='-mx-2 space-y-1'>
                            {navigation.map((item, index) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  className={classNames(
                                    index === selected
                                      ? 'bg-[#48a928] text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-[#48a928]',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                  onClick={() => setSelected(index)}
                                >
                                  <item.icon
                                    className='h-6 w-6 shrink-0'
                                    aria-hidden='true'
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        {/* <li>
                          <div className='text-xs font-semibold leading-6 text-gray-400'>
                            Your teams
                          </div>
                          <ul role='list' className='-mx-2 mt-2 space-y-1'>
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white'>
                                    {team.initial}
                                  </span>
                                  <span className='truncate'>{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li> */}
                        <li className='mt-auto'>
                          <a
                            href='#'
                            className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white'
                          >
                            <Cog6ToothIcon
                              className='h-6 w-6 shrink-0'
                              aria-hidden='true'
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
          <img
            src={Background}
            className='absolute inset-0 z-0 h-full w-full object-cover'
          />

          <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-[#002400] px-6 pb-4'>
            <div className='flex h-16 shrink-0 items-center'>
              <Link to='/' className='z-20'>
                <img className='h-8 w-auto' src={Logo} alt='Your Company' />
              </Link>
            </div>
            <nav className='flex flex-1 flex-col z-10'>
              <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                <li>
                  <ul role='list' className='-mx-2 space-y-1'>
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? 'bg-[#48a928] text-white'
                              : 'text-gray-400 hover:text-white hover:bg-[#48a928]',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                          onClick={() => setSelected()}
                        >
                          <item.icon
                            className='h-6 w-6 shrink-0'
                            aria-hidden='true'
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className='mt-auto'>
                  <a
                    href='#'
                    className='group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white'
                  >
                    <Cog6ToothIcon
                      className='h-6 w-6 shrink-0'
                      aria-hidden='true'
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className='lg:pl-72'>
          <div className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
            <button
              type='button'
              className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </button>

            {/* Separator */}
            <div
              className='h-6 w-px bg-gray-900/10 lg:hidden'
              aria-hidden='true'
            />

            <div className='flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6'>
              <div className='flex items-center gap-x-4 lg:gap-x-6'>
                <button
                  type='button'
                  className='-m-2.5 p-2.5 text-gray-400 hover:text-gray-500'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Separator */}
                <div
                  className='hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10'
                  aria-hidden='true'
                />

                {/* Profile dropdown */}
                <Menu as='div' className='relative'>
                  <Menu.Button className='-m-1.5 flex items-center p-1.5'>
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full bg-gray-50'
                      src={user?.user.user.photo}
                      alt=''
                    />
                    <span className='hidden lg:flex lg:items-center'>
                      <span
                        className='ml-4 text-sm font-semibold leading-6 text-gray-900'
                        aria-hidden='true'
                      >
                        {user?.user?.user.firstName} {user?.user?.user.lastName}
                      </span>
                      <ChevronDownIcon
                        className='ml-2 h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none'>
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-50' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                              )}
                              onClick={item.name === 'Sign out' && handleLogout}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className='py-1'>
            <div className='px-4 sm:px-6 lg:px-8'></div>
          </main>
        </div>
      </div>
    </>
  );
}
