// import FileIcon from '../assets/fileIcon.svg';
// import { CloudArrowDownIcon } from '@heroicons/react/24/solid';

import { useGetLoggedInUserQuery } from '../../app/services/dashboard';
import PatientDashboard from '../../components/Dashboard/PatientDashboard';
import LoadingPage from '../../components/LoadingPage';

/* eslint-disable react/prop-types */
export default function Home() {
  //   const onClickHandler = () => {
  //     setProject(project);
  //     setEditForm(!editForm);
  //   };

  const { data, isLoading } = useGetLoggedInUserQuery();

  const { user, loggedUser } = !isLoading && data.data;

  return (
    <PatientDashboard>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className='pl-8 flex flex-row justify-between mt-6 py-8'>
          <div className='flex flex-col w-full'>
            <div className='flex justify-between gap-x-10 mb-12 '>
              <div className='flex flex-col w-[33%] '>
                <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                  First Name
                </h5>
                <p className='text-[#667085] text-base'>
                  {loggedUser?.firstName}
                </p>
              </div>
              <div className='flex flex-col w-[33%] '>
                <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                  Last Name
                </h5>
                <p className='text-[#667085] text-base'>
                  {loggedUser?.lastName}
                </p>
              </div>
              <div className='flex flex-col w-[33%]  '>
                <h5 className=''>Email Address</h5>
                <p>Hear</p>
              </div>
            </div>
            <div className='flex justify-between gap-x-10 mb-12'>
              <div className='flex flex-col w-[33%] '>
                <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                  Email Address
                </h5>
                <p className='text-[#667085] text-base'>{user?.email}</p>
              </div>
              <div className='flex flex-col w-[33%] '>
                <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                  Phone
                </h5>
                <p className='text-[#667085] text-base'>{loggedUser.phone}</p>
              </div>
              <div className='flex flex-col w-[33%] '>
                <h5 className=' '></h5>
                <p>Hear</p>
              </div>
            </div>
            <div className='flex justify-between gap-x-10 mb-12'>
              <div className='flex flex-col w-[33%] '>
                <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                  Username
                </h5>
                <p className='text-[#667085] text-base'>{user?.username}</p>
              </div>
              <div className='flex flex-col w-[33%] '>
                <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                  Role
                </h5>
                <p className='text-[#667085] text-base capitalize '>
                  {user?.role}
                </p>
              </div>
              <div className='flex flex-col w-[33%] '>
                <h5 className='font-semibold text-sm text-[#101828] mb-8 '>
                  Address{' '}
                </h5>
                <p className='text-[#667085] text-base'>
                  {loggedUser.address || '---'}
                </p>
              </div>
            </div>
            {/* <div className='flex justify-between gap-x-10'>
            <div className='flex flex-col w-[33%] '>
              <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                Land Size
              </h5>
              <p className='text-[#667085] text-base'>
                {project?.landSize?.toLocaleString()} hectares
              </p>
            </div>
            <div className='flex flex-col w-[33%] '>
              <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                Location
              </h5>
              <p className='text-[#667085] text-base'>{project?.location}</p>
            </div>
            <div className='flex flex-col w-[33%] '>
              <h5 className=' font-semibold text-sm text-[#101828] mb-8'>
                Country
              </h5>
              <p className='text-[#667085] text-base'>{project?.country}</p>
            </div>
          </div> */}
          </div>
          {/* <div className='w-[70%]'>
          <h4 className='mb-6 text-[#101828] text-sm font-semibold'>
            About Project
          </h4>
          <div
            className='text-[#667085]'
            dangerouslySetInnerHTML={{
              __html: project?.description?.replace(/\n/g, '<br> <br>'),
            }}
          />
        </div> */}
        </div>
      )}
    </PatientDashboard>
  );
}
