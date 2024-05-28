/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import Pagination from './Pagination';

// Example usage:
// <DynamicTable
//   columns={[{ key: 'name', label: 'Name' }, { key: 'title', label: 'Title' }, { key: 'email', label: 'Email' }, { key: 'role', label: 'Role' }]}
//   data={[
//     { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
//     // More data...
//   ]}
// />

const formatResponse = (row, col) => {
  switch (col) {
    case 'officer':
      return `${row[col].firstName} ${row[col].lastName}`;
    case 'patient':
      return `${row[col].firstName} ${row[col].lastName}`;
    case 'date':
      return row[col].split('T')[0];
    case 'provider':
      return row[col].name;
    default:
      return row[col];
  }
};

function DynamicTable({
  columns,
  data,
  width,
  options,
  currentPage,
  totalPages,
  transactionsParams,
  setTransactionsParams,
  onClickPrevPage,
  onClickNextPage,
  loading,
  optionsType,
  handleShow,
  setDocument,
}) {
  // console.log('Table:', { columns, currentPage, totalPages });

  return (
    <div className={`px-4 sm:px-6 lg:px-8 w-[${width}] mb-8`}>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bMag-[#E8FFC8]'>
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        scope='col'
                        className='px-3 py-5 text-left text-sm font-semibold text-[#3BB900]'
                      >
                        {column.label}
                      </th>
                    ))}
                    {options && (
                      <th
                        scope='col'
                        className='px-3 py-5 text-left text-sm font-semibold text-[#3BB900]'
                      >
                        <span className='sr-only'>{options}</span>
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {loading ? (
                    <tr>
                      <td colSpan={columns.length} className='text-center py-4'>
                        <p className='text-[#48a928]'>No data found</p>
                      </td>
                    </tr>
                  ) : data && data.length > 0 ? (
                    data.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {columns.map((column) => (
                          <td
                            key={column.key}
                            className=' px-3 py-4 text-sm text-gray-500 truncate'
                          >
                            {/* {console.log(column, row)} */}
                            {column.key
                              ? formatResponse(row, column.key)
                              : '---'}
                          </td>
                        ))}
                        <td>
                          {options && optionsType === 'link' ? (
                            <Link to={`/dashboard/consultations/${row._id}`}>
                              <p className='text-[#48a928] text-sm hover:underline px-3'>
                                {options}
                              </p>
                            </Link>
                          ) : (
                            <button
                              className='text-[#48a928] text-sm cursor-pointer px-3 disabled:cursor-not-allowed disabled:text-gray-50'
                              onClick={() => {
                                setDocument(row);
                                handleShow();
                              }}
                              disabled={
                                !row.submitted ||
                                row.verification === 'verified' ||
                                row.verification === 'rejected'
                              }
                            >
                              {options}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className='text-center py-4'>
                        <p className='text-[#48a928]'>No data yet</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  transactionsParams={transactionsParams}
                  setTransactionsParams={setTransactionsParams}
                  onClickPrevPage={onClickPrevPage}
                  onClickNextPage={onClickNextPage}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicTable;
