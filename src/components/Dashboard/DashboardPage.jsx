/* eslint-disable react/prop-types */

import { useState } from 'react';

import DynamicTable from '../Table';
import Input from '../Input';
import { useLocation, useNavigate } from 'react-router';
import Button from '../Basics/Button';
import { useSelector } from 'react-redux';

export const DashboardPage = ({
  columns,
  data,
  options,
  title,
  subtitle,
  params,
  setParams,
  totalPages,
  currentPage,
  loading,
  optionsType,
}) => {
  const [formData, setFormData] = useState({
    search: '',
  });

  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  // };

  const onChangeHandler = (e) => {
    setFormData(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  const onClickHandler = () => {
    setParams({
      ...params,
      search: formData.search,
    });
  };

  const createHandler = () => {
    navigate('/dashboard/consultations/create');
  };

  return (
    <>
      <div className='pl-8 flex flex-row justify-between py-8'>
        <div className='flex flex-col'>
          <p className='text-lg font-medium text-[#101828]'>{title}</p>
          <p className='text-sm font-normal text-[#667085]'>{subtitle}</p>
        </div>
      </div>
      {location.pathname.includes('consultations') && (
        <div className='flex justify-between'>
          <div className='flex px-8 gap-6'>
            <div className='w-60'>
              <Input
                label={'Search'}
                name={'search'}
                onChange={onChangeHandler}
              />
            </div>

            <Button name={'Search'} onClick={onClickHandler} />
          </div>
          {user && (
            <div className='px-8 self-end'>
              <Button name={'Create consultation'} onClick={createHandler} />
            </div>
          )}
        </div>
      )}

      <DynamicTable
        columns={columns}
        data={data}
        width={'100%'}
        options={options}
        currentPage={currentPage}
        totalPages={totalPages}
        onClickPrevPage={() => {
          if (params.page === 1) return;
          setParams({
            ...params,
            page: params.page - 1,
          });
        }}
        onClickNextPage={() => {
          if (params.page === totalPages) return;
          setParams({
            ...params,
            page: params.page + 1,
          });
        }}
        loading={loading}
        optionsType={optionsType}
      />
    </>
  );
};
