import Acorn from '../assets/Acorn.svg';
import Shell from '../assets/Shell.svg';
import RaboBank from '../assets/Rabobank svg.svg';
import UNDP from '../assets/UNDP Climate svg.svg';
import WorldBank from '../assets/World Bank svg.svg';
import Visa from '../assets/Visa Inc. svg.svg';

export default function Logo() {
  return (
    <div className='bg-[#f3f8f5] py-18 sm:py-24'>
      <div className='flex justify-between max-w-full px-6 lg:px-32'>
        <h2 className='text-black w-1/2 font-bold text-5xl'>Our Partners</h2>
        <div className='mx-auto grid max-w-lg grid-cols-4 items-center gap-x-2 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-6 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:grid-cols-6'>
          <img
            className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
            src={Visa}
            alt='Visa'
            width={158}
            height={48}
          />
          <img
            className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
            src={WorldBank}
            alt='World Bank'
            width={158}
            height={48}
          />
          <img
            className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
            src={UNDP}
            alt='UNDP'
            width={158}
            height={48}
          />
          <img
            className='col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1'
            src={Acorn}
            alt='Acorn'
            width={158}
            height={48}
          />
          <img
            className='col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1'
            src={RaboBank}
            alt='Rabo Bank'
            width={158}
            height={48}
          />
          <img
            className='col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1'
            src={Shell}
            alt='Shell'
            width={158}
            height={48}
          />
        </div>
      </div>
    </div>
  );
}
