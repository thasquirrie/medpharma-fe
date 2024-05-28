/* eslint-disable react/prop-types */
// }

import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid';

export default function Pagination({
  currentPage,
  totalPages,
  onClickPrevPage,
  onClickNextPage,
}) {
  return (
    <nav className='flex items-center justify-between border-t border-gray-200 px-4 sm:px-4 pb-4'>
      <div className='-mt-px flex w-0 flex-1'>
        <button
          className='inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-[#48a928] hover:border-[#48a928]  disabled:text-gray-50 hover:disabled:border-gray-200'
          onClick={onClickPrevPage}
          disabled={currentPage === 1}
        >
          <ArrowLongLeftIcon className='mr-3 h-5 w-5 ' aria-hidden='true' />
          Previous
        </button>
      </div>
      <div className='hidden md:-mt-px md:flex'>
        {/* Generate dynamic page numbers */}
        <p
          className={`inline-flex items-center border-t-2 border-[#48a928] text-[#48a928]
              hover:border-gray-300 px-4 pt-4 text-sm font-medium cursor-pointer`}
        >
          {currentPage}
        </p>
      </div>
      <div className='-mt-px flex w-0 flex-1 justify-end'>
        <button
          className='inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-[#48a928] hover:border-[#48a928] disabled:text-gray-50 hover:disabled:border-gray-200'
          onClick={onClickNextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <ArrowLongRightIcon className='ml-3 h-5 w-5 ' aria-hidden='true' />
        </button>
      </div>
    </nav>
  );
}
