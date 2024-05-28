/* eslint-disable react/prop-types */
const PatientsOptions = ({
  label,
  name,
  options,
  setFormData,
  formData,
  value,
}) => {
  const onChangeHandler = (e) => {
    console.log('Value:', e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-5 border-b border-gray-900/10 pb-8 md:grid-cols-3'>
      <div className='my-auto pt-2'>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>
          {label}
        </h2>
      </div>

      <div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6 md:col-span-2 my-auto'>
        <div className='sm:col-span-4'>
          <div className='relative rounded-md shadow-sm'>
            <select
              name={name}
              className='block w-full rounded-md border-1 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#D0D5DD] sm:text-sm sm:leading-6 capitalize'
              onChange={onChangeHandler}
              value={value}
            >
              <>
                <option>Select one</option>
                {options &&
                  options.map((option, index) => (
                    <option key={index} value={option._id}>
                      {option.firstName} {option.lastName}
                    </option>
                  ))}
              </>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsOptions;
