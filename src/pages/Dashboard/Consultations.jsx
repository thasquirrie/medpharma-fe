import { useEffect, useState } from 'react';
import { useLazyGetAllConsultationsQuery } from '../../app/services/wallet';
import { lazyQueryOptions } from '../../utils/queryOptions';
import { DashboardPage } from '../../components/Dashboard/DashboardPage';
import LoadingPage from '../../components/LoadingPage';
import AdminDashboard from '../../components/Dashboard/Dashboard';
// import { StarIcon } from '@heroicons/react/24/solid';

const columns = [
  {
    key: 'patient',
    label: 'Patient',
  },
  {
    key: 'officer',
    label: 'Officer',
  },
  {
    key: 'date',
    label: 'Consultation Date',
  },
  {
    key: 'status',
    label: 'Status',
  },
  {
    key: 'condition',
    label: 'Medical Condition',
  },
  {
    key: 'time',
    label: 'Time of appointment',
  },
  {
    key: 'provider',
    label: 'Health Care Provider',
  },
];

export const Consultations = () => {
  const [params, setParams] = useState({
    page: 1,
  });
  const [
    triggerGetConsultations,
    { data: consultations, isLoading: consultationsLoading },
  ] = useLazyGetAllConsultationsQuery(lazyQueryOptions);

  useEffect(() => {
    triggerGetConsultations(params);
  }, [triggerGetConsultations, params]);

  return (
    <AdminDashboard>
      {consultationsLoading ? (
        <LoadingPage />
      ) : (
        <>
          <DashboardPage
            columns={columns}
            data={consultations?.data?.data}
            options={'View details'}
            title={'Consultations'}
            subtitle={'View and update everything about consultations here'}
            totalPages={consultations?.totalPages}
            currentPage={params.page}
            params={params}
            setParams={setParams}
            loading={consultationsLoading}
            optionsType={'link'}
          />
          {/* <div className='flex items-center'>
            <div className='flex items-center'>
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className='text-indigo-500 h-5 w-5 flex-shrink-0'
                  aria-hidden='true'
                />
              ))}
            </div> */}
          {/* <p className='sr-only'>{product.rating} out of 5 stars</p> */}
          {/* </div> */}
          {/* </div> */}
        </>
      )}
    </AdminDashboard>
  );
};
