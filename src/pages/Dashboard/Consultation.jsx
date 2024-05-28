// import { useState } from 'react';

import { useParams } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';
import LoadingPage from '../../components/LoadingPage';

import { useEffect } from 'react';
import { lazyQueryOptions } from '../../utils/queryOptions';

import { useLazyGetConsultationQuery } from '../../app/services/dashboard';
import ConsultationComponent from '../../components/ConsultationComponent';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Consultation = () => {
  const params = useParams();
  console.log({ params });

  const [triggerGetConsultation, { data, isLoading }] =
    useLazyGetConsultationQuery(lazyQueryOptions);

  useEffect(() => {
    triggerGetConsultation(params);
  }, [triggerGetConsultation, params]);

  console.log({ data });

  return (
    <Dashboard>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <>
          <div className='px-32 py-16 mx-auto'>
            <div className='flex justify-between'>
              <h3 className='text-xl font-semibold text-black'>
                {data?.data?.data?.title}
              </h3>
              <div className='group'>
                <div className='relative'>
                  <p
                    className={classNames(
                      data?.data?.data?.status === 'pending'
                        ? 'bg-[#FFF9CF] text-[#7B5C03]'
                        : 'bg-[#E6FBD9] text-[#0F5B1D]',
                      '  px-5 py-3 border rounded-full capitalize'
                    )}
                  >
                    {data?.data?.data?.status}
                  </p>
                </div>
              </div>
            </div>
            <ConsultationComponent consultation={data?.data?.data} />
          </div>
        </>
      )}
    </Dashboard>
  );
};

export default Consultation;
