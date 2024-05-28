/* eslint-disable react/prop-types */
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Input = ({
  label,
  name,
  type,
  required,
  placeholder,
  value,
  onChange,
  invalidEmail,
  Icon,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className='block text-sm font-medium leading-6 text-gray-900'
      >
        {label}
      </label>
      <div className='relative mt-2'>
        {Icon && (
          <div className='pointer-events-none absolute inset-y-0 right-2 flex items-center pl-3 '>
            <Icon
              className='h-5 w-5 text-gray-400 hover:cursor-pointer'
              aria-hidden='true'
            />
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={name}
          value={value}
          required={required ? true : false}
          className={classNames(
            invalidEmail ? 'focus:ring-red-300' : 'focus:ring-green-300',
            'block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
          )}
          placeholder={placeholder}
          onChange={onChange}
        />
        {invalidEmail && (
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <ExclamationCircleIcon
              className='h-5 w-5 text-red-500'
              aria-hidden='true'
            />
          </div>
        )}
      </div>
      {invalidEmail && (
        <p className='mt-2 text-sm text-red-600' id='email-error'>
          Not a valid email address.
        </p>
      )}
    </div>
  );
};

export default Input;
