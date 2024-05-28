/* eslint-disable react/prop-types */
import HeroPicture from '../assets/Content.svg';
import CheckIcon from '../assets/Check icon.svg';
import Line from './Line';

// const features = [
//   {
//     name: 'Agroforestry',
//     description:
//       'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
//     icon: CheckIcon,
//   },
//   {
//     name: 'SSL certificates.',
//     description:
//       'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
//     icon: CheckIcon,
//   },
//   {
//     name: 'Database backups.',
//     description:
//       'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
//     icon: CheckIcon,
//   },
// ];

export default function HeroSection({ background, features, title, subtitle }) {
  return (
    <div className={`overflow-hidden bg-[${background}] py-24 sm:py-32`}>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:max-w-none lg:grid-cols-2'>
          <div className='lg:pr-8 lg:pt-4 my-auto'>
            <div className='lg:max-w-lg'>
              <p className='mt-2 text-3xl font-bold tracking-tight text-[#101828] sm:text-4xl'>
                {title}
              </p>
              <Line />
              <p className='mt-6 text-lg leading-8 text-[#667085]'>
                {subtitle}
              </p>
              <dl className='mt-10 max-w-xl space-y-4 text-base leading-7 text-gray-600 lg:max-w-none'>
                {features.map((feature, index) => (
                  <div key={index} className='relative pl-9'>
                    <dt className='inline text-[#667085]'>
                      <img
                        src={CheckIcon}
                        className='absolute left-1 top-1 h-5 w-5 text-indigo-600'
                        aria-hidden='true'
                      />
                      {feature.name}
                    </dt>{' '}
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src={HeroPicture}
            alt='Product screenshot'
            className=' shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0'
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
}
