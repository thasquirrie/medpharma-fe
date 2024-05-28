/* eslint-disable react/no-unescaped-entities */
import Logo from '../assets/SvgjsG1011.svg';
import Input from '../components/Input';

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import { useResetPasswordMutation } from '../app/services/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Background from '../assets/Vector.svg';

export default function ResetPassword() {
  const { pin, email } = useParams();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  // const [signupError, setSignupError] = useState('');
  const [resetPassword, { isSuccess, isLoading }] = useResetPasswordMutation();

  const navigate = useNavigate();
  // const location = useLocation();

  const { newPassword, confirmPassword } = formData;

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await resetPassword({
        email,
        newPassword,
        pin,
        confirmPassword,
      }).unwrap();
      const { message } = result;
      setTimeout(() => {
        navigate('/auth/login', { state: { prevPage: 'signup' } });
      }, 1000);
      // setSignupError('');
      setAlert(true);
      setMessage(message);
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
      <Header />
      {alert && (
        <Alert
          isSuccess={isSuccess}
          message={message}
          alert={alert}
          setAlert={setAlert}
        />
      )}
      <div className='relative bg-[#002400]'>
        <div className='relative flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
          <img
            src={Background}
            className='absolute inset-0 z-0 h-full w-full object-cover'
          />
          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[420px] z-10'>
            <div className='bg-white px-6 py-12 shadow sm:px-12'>
              <div className='sm:mx-auto sm:w-full sm:max-w-md pb-10'>
                <img className='mx-auto h-10 w-auto' src={Logo} alt='Dorewa' />
                <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                  Reset Password
                </h2>
                <p className='pt-3 text-sm text-gray-700 text-center'>
                  Please enter your new password details
                </p>
              </div>

              <form
                onSubmit={onSubmitHandler}
                className='space-y-6'
                action='#'
                method='POST'
              >
                <Input
                  label='Email'
                  name='email'
                  type='email'
                  value={email}
                  onChange={onChangeHandler}
                />

                <Input
                  label='Pin'
                  name='pin'
                  type='text'
                  value={pin}
                  onChange={onChangeHandler}
                />

                <Input
                  label='New Password'
                  name='newPassword'
                  type={'password'}
                  value={newPassword}
                  onChange={onChangeHandler}
                />

                <Input
                  label='Confirm Password'
                  name='confirmPassword'
                  type={'password'}
                  value={confirmPassword}
                  onChange={onChangeHandler}
                />

                <div>
                  <button
                    type='submit'
                    className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-not-allowed'
                    disabled={
                      !(email && pin && newPassword && confirmPassword) ||
                      isLoading ||
                      newPassword !== confirmPassword
                    }
                  >
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
