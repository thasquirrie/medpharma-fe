import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const filters = [
  { id: 1, name: 'patient name' },
  { id: 2, name: 'medical condition' },
  { id: 3, name: 'date' },
  { id: 4, name: 'healthcare provider' },
  { id: 5, name: 'consultation type' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SelectOptions() {
  const [selected, setSelected] = useState(filters[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <div className='w-60'>
          <Listbox.Label className='block text-sm font-medium leading-6 text-gray-900'>
            Filter
          </Listbox.Label>
          <div className='relative mt-2'>
            <Listbox.Button className='relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2  sm:text-sm sm:leading-6 capitalize'>
              <span className='block truncate'>{selected.name}</span>
              <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full  capitalize overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {filters.map((filter) => (
                  <Listbox.Option
                    key={filter.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-[#48A928] text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9 capitalize'
                      )
                    }
                    value={filter}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {filter.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-[#48A928]',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}
