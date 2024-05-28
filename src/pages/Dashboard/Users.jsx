import { useEffect, useState } from 'react';
import { lazyQueryOptions } from '../../utils/queryOptions';
import { DashboardPage } from '../../components/Dashboard/DashboardPage';
import LoadingPage from '../../components/LoadingPage';
import AdminDashboard from '../../components/Dashboard/Dashboard';
import { useLazyGetAllPatientsQuery } from '../../app/services/dashboard';

const columns = [
  {
    key: 'firstName',
    label: 'First Name',
  },
  {
    key: 'lastName',
    label: 'Last Name',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'phone',
    label: 'Phone',
  },
  {
    key: 'createdAt',
    label: 'Date Registered',
  },
  {
    key: 'dob',
    label: 'Date of Birth',
  },
  //   {
  //     key: 'verified',
  //     label: 'Verified',
  //   },
];

export const Users = () => {
  const [params, setParams] = useState({
    page: 1,
  });
  const [triggerGetUsers, { data: users, isLoading: usersLoading }] =
    useLazyGetAllPatientsQuery(lazyQueryOptions);

  useEffect(() => {
    triggerGetUsers(params);
  }, [triggerGetUsers, params]);

  return (
    <AdminDashboard>
      {usersLoading ? (
        <LoadingPage />
      ) : (
        <>
          <DashboardPage
            columns={columns}
            data={users?.data?.data}
            // options={'View details'}
            title={'Patients'}
            subtitle={'View users here'}
            totalPages={users?.totalPages}
            currentPage={params.page}
            params={params}
            setParams={setParams}
            loading={usersLoading}
            // optionsType={'link'}
          />
        </>
      )}
    </AdminDashboard>
  );
};
