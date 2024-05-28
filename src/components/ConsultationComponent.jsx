// import FileIcon from '../assets/fileIcon.svg';
// import { CloudArrowDownIcon } from '@heroicons/react/24/solid';

/* eslint-disable react/prop-types */
export default function ConsultationComponent({ key, consultation }) {
  console.log({ consultation });
  return (
    <>
      <div key={key} className='flex justify-between pt-4'></div>
      <div className='flex flex-row justify-between mt-6 py-8'>
        <div className='flex flex-col w-full'>
          <div className='flex justify-between gap-x-10 mb-12 '>
            <div className='flex flex-col w-[33%] '>
              <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                Patient Name
              </h5>
              <p className='text-[#667085] text-base'>
                {consultation?.patient.firstName}{' '}
                {consultation?.patient.lastName}
              </p>
            </div>
            <div className='flex flex-col w-[33%] '>
              <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                Project Type
              </h5>
              <p className='text-[#667085] text-base capitalize'>
                {consultation?.type || '-'}
              </p>
            </div>
            <div className='flex flex-col w-[33%]  '>
              <h5 className=''>Establishment</h5>
              <p>Hear</p>
            </div>
          </div>
          <div className='flex justify-between gap-x-10 mb-12'>
            <div className='flex flex-col w-[33%] '>
              <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                Officer
              </h5>
              <p className='text-[#667085] text-base'>
                {consultation?.officer.firstName}{' '}
                {consultation?.officer.lastName}
              </p>
            </div>
            <div className='flex flex-col w-[33%] '>
              <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                Medical Condition
              </h5>
              <p className='text-[#667085] text-base'>
                {consultation?.condition}
              </p>
            </div>
            <div className='flex flex-col w-[33%] '>
              <h5 className=' '></h5>
              <p>Hear</p>
            </div>
          </div>
          <div className='flex justify-between gap-x-10 mb-12'>
            <div className='flex flex-col w-[33%] '>
              <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                Phone
              </h5>
              <p className='text-[#667085] text-base'>
                {consultation?.patient.phone}
              </p>
            </div>
            <div className='flex flex-col w-[33%] '>
              <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                Date
              </h5>
              <p className='text-[#667085] text-base'>
                {consultation?.date.split('T')[0]}
              </p>
            </div>
            <div className='flex flex-col w-[33%] '>
              <h5 className='font-semibold text-sm text-[#101828] mb-8 '>
                Healthcare Provider
              </h5>
              <p className='text-[#667085] text-base'>
                {consultation?.provider.name}
              </p>
            </div>
          </div>
          <div className='flex justify-between gap-x-10'>
            <div className='flex flex-col w-[33%] '>
              <h5 className='font-semibold text-sm text-[#101828] mb-8'>
                Healthcare Specialization
              </h5>
              <p className='text-[#667085] text-base'>
                {consultation?.provider.specialization}
              </p>
            </div>
          </div>
        </div>
        <div className='w-[70%]'>
          <h4 className='mb-6 text-[#101828] text-sm font-semibold'>Notes</h4>
          <div
            className='text-[#667085]'
            dangerouslySetInnerHTML={{
              __html: consultation?.notes?.replace(/\n/g, '<br> <br>'),
            }}
          />
        </div>
      </div>
    </>
  );
}
