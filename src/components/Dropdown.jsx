/* eslint-disable react/prop-types */
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { useDispatch } from 'react-redux';
import { logOut } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown({ user }) {
  const loggedUser = user.user.user;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-[#BAE7C9] shadow-sm'>
          <UserCircleIcon className='h-8 w-8' />
          <p className='my-auto'>{loggedUser.username}</p>
          <ChevronDownIcon
            className='-mr-1 h-5 w-5 text-gray-400 my-auto'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={
                    loggedUser.role === 'officer'
                      ? '/dashboard/patients'
                      : '/patient/home'
                  }
                  className={classNames(
                    active ? 'bg-[#48A928] text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Dashboard
                </Link>
              )}
            </Menu.Item>

            {/* {loggedUser.role === 'admin' && (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/admin/projects'
                    className={classNames(
                      active ? 'bg-[#48A928] text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    Admin Dashboard
                  </Link>
                )}
              </Menu.Item>
            )} */}

            {/* <form method='POST' action='#'> */}
            <Menu.Item>
              {({ active }) => (
                <button
                  type='submit'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-left text-sm'
                  )}
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
            {/* </form> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
