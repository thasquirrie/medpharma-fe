/* eslint-disable react/prop-types */
export default function Button({ onClick, name }) {
  return (
    <button
      type='button'
      className='rounded-md bg-[#48A928] px-3 py-1 h-10 text-sm font-semibold text-white shadow-sm hover:bg-[#97e77c] self-end'
      onClick={onClick}
    >
      {name}
    </button>
  );
}
