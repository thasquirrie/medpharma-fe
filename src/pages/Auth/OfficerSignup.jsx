/* eslint-disable react/no-unescaped-entities */
import Logo from '../../assets/SvgjsG1011.svg';
import Input from '../../components/Input';
import Google from '../../assets/Social icon.svg';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';
import { useRegisterPatientMutation } from '../../app/services/auth';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Background from '../../assets/Vector.svg';

export default function OfficerSignup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    username: '',
    dob: '',
  });
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  // const [signupError, setSignupError] = useState('');
  const [registerPatient, { isSuccess, isLoading }] =
    useRegisterPatientMutation();

  const navigate = useNavigate();
  // const location = useLocation();

  const {
    email,
    password,
    phone,
    firstName,
    lastName,
    address,
    username,
    dob,
    confirmPassword,
  } = formData;

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await registerPatient({
        email: email,
        password,
        confirmPassword,
        phone,
        firstName,
        lastName,
        address,
        dob,
        username,
      }).unwrap();
      const { message } = result;
      setTimeout(() => {
        navigate('/verify', { state: { prevPage: 'signup' } });
      }, 1000);
      // setSignupError('');
      setAlert(true);
      setMessage(message);
      localStorage.setItem('email', email);
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
                  Officer Signup
                </h2>
                <p className='pt-3 text-sm text-gray-700 text-center'>
                  Welcome back! Please enter your details
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
                  label='Phone'
                  name='phone'
                  type='text'
                  value={phone}
                  onChange={onChangeHandler}
                />

                <Input
                  label='Password'
                  name='password'
                  type={'password'}
                  value={password}
                  onChange={onChangeHandler}
                />

                <Input
                  label='Confirm Passsword'
                  name='confirmPassword'
                  type={'password'}
                  value={confirmPassword}
                  onChange={onChangeHandler}
                />

                <Input
                  label='First Name'
                  name='firstName'
                  type={'text'}
                  value={firstName}
                  onChange={onChangeHandler}
                />

                <Input
                  label='Last Name'
                  name='lastName'
                  type={'text'}
                  value={lastName}
                  onChange={onChangeHandler}
                />

                <Input
                  label='Username'
                  name='username'
                  type={'text'}
                  value={username}
                  onChange={onChangeHandler}
                />

                <div>
                  <button
                    type='submit'
                    className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:cursor-not-allowed'
                    disabled={!(email && password && phone) || isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Create Account'}
                  </button>
                </div>
              </form>

              <div>
                <div className='relative mt-10'>
                  <div
                    className='absolute inset-0 flex items-center'
                    aria-hidden='true'
                  >
                    <div className='w-full border-t border-gray-200' />
                  </div>
                  <div className='relative flex justify-center text-sm font-medium leading-6'>
                    <span className='bg-white px-6 text-gray-900'>
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className='mt-6 grid gap-4'>
                  <a
                    href='#'
                    className='flex w-full items-center border-1 border-gray-300 justify-center gap-3 rounded-md bg-white px-3 py-1.5 text-[#24292F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400'
                  >
                    <img className='h-5 w-5' src={Google} alt='Google icon' />
                    <span className='text-sm font-semibold leading-6 text-[#24292F]'>
                      Sign in with Google
                    </span>
                  </a>
                </div>
                <p className='mt-10 text-center text-sm text-gray-500'>
                  Already have an account?{' '}
                  <Link
                    to='/auth/login'
                    className='font-semibold leading-6 text-green-600 hover:text-green-500'
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
