import //   PhotoIcon,
//   UserCircleIcon,
//   EyeIcon,
//   EyeSlashIcon
'@heroicons/react/24/solid';
import { useState } from 'react';
import { useUpdatePasswordMutation } from '../app/services/dashboard';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

export default function Password() {
  const [formData, setFormData] = useState({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState(false);

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { password, newPassword, confirmNewPassword } = formData;

  const [updatePassword, { isLoading, isSuccess }] =
    useUpdatePasswordMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updatePassword({
        password,
        newPassword,
        confirmNewPassword,
      }).unwrap();

      const { message } = result;
      setFormData({ password: '', newPassword: '', confirmNewPassword: '' });
      setAlert(true);
      setMessage(message);
      setTimeout(() => {
        navigate('/auth/login');
        setMessage('');
        setAlert(false);
      }, 3000);
    } catch (error) {
      if (error.data.message) {
        console.log({ error });
        // setSignupError(error.data.message);
        setAlert(true);
        setMessage(error.data.message);
      } else {
        // setSignupError('Something went wrong, Try again later!');
        setAlert(true);
        setMessage('Something went wrong, Try again later!');
      }
    }
  };

  return (
    <>
      <Alert
        alert={alert}
        isSuccess={isSuccess}
        message={message}
        setAlert={setAlert}
      />
      <div className='divide-y-2'>
        <div className='flex flex-row justify-between py-8'>
          <div className='flex flex-col'>
            <p className='text-lg font-medium text-[#101828]'>Password</p>
            <p className='text-sm font-normal text-[#667085]'>
              Update your password here.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='space-y-12'>
            <div className='grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3'>
              <div className='my-auto pt-2'>
                <h2 className='text-base font-semibold leading-7 text-gray-900'>
                  Current Password
                </h2>
              </div>

              <div className='grid pt-8 max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
                <div className='sm:col-span-6'>
                  <div className='mt-2'>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      autoComplete='password'
                      className='block w-full rounded-md border-1 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      placeholder='Enter current password'
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3'>
              <div className='my-auto pt-2'>
                <h2 className='text-base font-semibold leading-7 text-gray-900'>
                  New Password
                </h2>
              </div>

              <div className='grid pt-8 max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
                <div className='sm:col-span-6'>
                  <div className='mt-2'>
                    <input
                      type='password'
                      name='newPassword'
                      id='newPassword'
                      autoComplete='password'
                      className='block w-full rounded-md border-1 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      placeholder='Enter new password'
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3'>
              <div className='my-auto pt-2'>
                <h2 className='text-base font-semibold leading-7 text-gray-900'>
                  Confirm New Password
                </h2>
              </div>

              <div className='grid pt-8 max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2'>
                <div className='sm:col-span-6'>
                  <div className='mt-2'>
                    <input
                      type='password'
                      name='confirmNewPassword'
                      id='confirmNewPassword'
                      autoComplete='password'
                      className='block w-full rounded-md border-1 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      placeholder='Confirm new password'
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-6 mb-12'>
            <button
              type='button'
              className='text-sm font-semibold leading-6 text-gray-900 border px-3 py-2 rounded-md'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-md bg-[#48A928] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#a4ee8c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#48A928] disabled:cursor-not-allowed'
              disabled={!(password || newPassword || confirmNewPassword)}
            >
              {isLoading ? 'Updating password...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
