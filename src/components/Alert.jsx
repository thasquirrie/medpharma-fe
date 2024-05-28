/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import {
//   CheckCircleIcon,
//   XMarkIcon,
//   ExclamationTriangleIcon,
// } from '@heroicons/react/20/solid';

// export default function Alert({ isSuccess, message, setAlert }) {
//   const handleClick = () => {
//     setAlert(false);
//   };
//   return (
//     <div className='fixed -top-96 sm:-top-56 left-0 w-full h-full flex items-center justify-center z-50'>
//       <div
//         className={
//           isSuccess ? 'rounded-md bg-green-50 p-4' : 'rounded-md bg-red-50 p-4'
//         }
//       >
//         <div className='flex'>
//           <div className='flex-shrink-0'>
//             {isSuccess ? (
//               <CheckCircleIcon
//                 className='h-5 w-5 text-green-400'
//                 aria-hidden='true'
//               />
//             ) : (
//               <ExclamationTriangleIcon
//                 className='h-5 w-5 text-red-400'
//                 aria-hidden='true'
//               />
//             )}
//           </div>
//           <div className='ml-3'>
//             <p
//               className={
//                 isSuccess
//                   ? 'text-sm font-medium text-green-800'
//                   : 'text-sm font-medium text-red-800'
//               }
//             >
//               {message}
//             </p>
//           </div>
//           <div className='ml-auto pl-3'>
//             <div className='-mx-1.5 -my-1.5'>
//               <button
//                 type='button'
//                 className={
//                   isSuccess
//                     ? 'inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50'
//                     : 'inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50'
//                 }
//                 onClick={handleClick}
//               >
//                 <span className='sr-only'>Dismiss</span>
//                 <XMarkIcon className='h-5 w-5' aria-hidden='true' />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

console.log('We were called!');

export default function Alert({ isSuccess, message, alert, setAlert }) {
  // const [show, setShow] = useState(setAlert);
  const handleClick = () => {
    setAlert(false);
  };

  setTimeout(() => {
    setAlert(false);
  }, 3000);

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live='assertive'
        className='pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50'
      >
        <div className='flex w-full flex-col items-center space-y-4 sm:items-end'>
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={alert}
            as={Fragment}
            enter='transform ease-out duration-300 transition'
            enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
            enterTo='translate-y-0 opacity-100 sm:translate-x-0'
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div
              className={classNames(
                isSuccess ? 'bg-green-100' : 'bg-red-200',
                'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'
              )}
            >
              <div className='p-4'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    {isSuccess ? (
                      <CheckCircleIcon
                        className='h-6 w-6 text-green-400'
                        aria-hidden='true'
                      />
                    ) : (
                      <ExclamationTriangleIcon
                        className='h-6 w-6 text-red-400'
                        aria-hidden='true'
                      />
                    )}
                  </div>
                  <div className='ml-3 w-0 flex-1 pt-0.5'>
                    <p
                      className={classNames(
                        isSuccess ? 'text-green-600' : 'text-red-900',
                        'text-sm font-medium'
                      )}
                    >
                      {message}
                    </p>
                    {/* <p className='mt-1 text-sm text-gray-500'>
                      Anyone with a link can now view this file.
                    </p> */}
                  </div>
                  <div className='ml-4 flex flex-shrink-0'>
                    <button
                      type='button'
                      className={classNames(
                        isSuccess ? ' text-green-600' : ' text-red-600',
                        'inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      )}
                      onClick={() => {
                        handleClick();
                      }}
                    >
                      <span className='sr-only'>Close</span>
                      <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
