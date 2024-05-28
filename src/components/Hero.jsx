import { Link } from 'react-router-dom';
// import Forest from '../assets/Hero.jpg';
import Hero from '../assets/624111.jpg';

export default function Example() {
  return (
    <div className='bg-gray-900 relative'>
      <div className='relative isolate overflow-hidden pt-14'>
        <div
          className='absolute inset-0 bg-black opacity-5 z-0'
          aria-hidden='true'
        />
        <img
          src={Hero}
          alt=''
          className='absolute inset-0 -z-10 h-full w-full object-cover'
        />

        <div className='px-12 max-w-5xl py-32 sm:py-48 lg:py-56 z-20'>
          <div className='z-20'>
            <h1 className='w-full text-2xl font-bold tracking-tight text-white sm:text-[2.5rem]'>
              Consultations in one place
            </h1>
            {/* <h1 className='w-full mt-4 text-2xl font-bold tracking-tight text-[#48A928] sm:text-[2.5rem] z-50 cursor-pointer block'>
              to Carbon Neutrality
            </h1> */}
            <p className='mt-6 max-w-xl text-lg leading-8 text-white z-20'>
              We simplify the process of discovering, listing, consultations of
              individuals for efficiency.
            </p>
            <div className='mt-10 flex items-center justify-start gap-x-6'>
              <Link
                to='/auth/patient/signup'
                className='rounded-md bg-[#48A928] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#87e567] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 z-20'
              >
                Patient Signup
              </Link>
              <Link
                to='/auth/officer/signup'
                className='rounded-md bg-[#48A928] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#87e567] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 z-20'
              >
                Officer Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
