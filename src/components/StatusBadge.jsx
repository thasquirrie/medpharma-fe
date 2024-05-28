/* eslint-disable react/prop-types */

const StatusBadge = ({ document }) => {
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };
  return (
    <>
      <span
        className={classNames(
          document.status === 'verified'
            ? 'bg-[#E6FBD9] text-[#0F5B1D] '
            : document.status === 'in-review'
            ? 'bg-[#FFF9CF] text-[#7B5C03] '
            : 'bg-[#FFE8D7] text-[#931222]',
          `text-center px-3 py-1 text-xs w-[5rem] rounded-xl`
        )}
      >
        {document.status === 'verified'
          ? 'Verified'
          : document.status === 'in-review'
          ? 'In Review'
          : document.status === 'rejected'
          ? 'Rejected'
          : 'Missing'}
      </span>
    </>
  );
};

export default StatusBadge;
