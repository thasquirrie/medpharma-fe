/* eslint-disable react/no-unescaped-entities */
import Logo from '../../assets/SvgjsG1011.svg';
import Input from '../../components/Input';
import Google from '../../assets/Social icon.svg';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../app/services/auth';
import { setCredentials } from '../../features/auth/authSlice';
import { useState } from 'react';
import Alert from '../../components/Alert';
import Header from '../../components/Header';
import Background from '../../assets/Vector.svg';
import Footer from '../../components/Footer';

// import

export default function Login() {
  const [email, setEmail] = useState('');
  // const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState(false);

  console.log(loginError);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const handleEmailChange = (e) => {
    const emailCheckRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,12})+$/;
    setEmail(e.target.value);

    if (e.target.value.length > 0 && !emailCheckRegex.test(e.target.value)) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({
        email: email,
        // username: username,
        password: password,
      }).unwrap();

      const { data, token, message } = result;
      setLoginError('');
      setAlert(true);
      setMessage(message);

      dispatch(setCredentials({ user: { user: data.user, token: token } }));
      setTimeout(() => {
        const redirectUrl = localStorage.getItem('redirectUrl');
        if (redirectUrl) {
          localStorage.removeItem('redirectUrl');
          navigate(redirectUrl);
        } else if (!data.user.email_verified) {
          localStorage.setItem('email', email);
          navigate('/verify', { state: { prevPage: 'login' } });
        } else {
          if (data.user.role === 'officer') {
            navigate('/dashboard/patients');
          } else {
            navigate('/patient/home');
          }
        }
      }, 1000);
    } catch (err) {
      if (err.data.message) {
        console.log({ err });
        setLoginError(err.data.message);
        setAlert(true);
        setMessage(err.data.message);
      } else {
        setLoginError('Something went wrong, Try again later!');
        setAlert(true);
        setMessage('Something went wrong, Try again later!');
      }
      // setOpenSnackbar(true);
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
        <div className='relative flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#002400]'>
          <img
            src={Background}
            className='absolute inset-0 z-0 h-full w-full object-cover'
          />
          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[420px] z-10'>
            <div className='bg-white px-6 py-12 shadow sm:px-12'>
              <div className='sm:mx-auto sm:w-full sm:max-w-md pb-10'>
                <img className='mx-auto h-10 w-auto' src={Logo} alt='Dorewa' />
                <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                  Sign in
                </h2>
                <p className='pt-3 text-sm text-gray-700 text-center'>
                  Welcome back! Please enter your details
                </p>
              </div>

              <form onSubmit={handleLogin} className='space-y-6' action='#'>
                <Input
                  label='Email'
                  name='email'
                  type='email'
                  value={email}
                  invalidEmail={invalidEmail}
                  onChange={handleEmailChange}
                />

                <Input
                  label='Password'
                  name='password'
                  type={'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <input
                      id='remember-me'
                      name='remember-me'
                      type='checkbox'
                      className='h-4 w-4 rounded border-gray-300 text-green-400 focus:ring-green-400'
                    />
                    <label
                      htmlFor='remember-me'
                      className='ml-3 block text-sm leading-6 text-gray-900'
                    >
                      Remember me
                    </label>
                  </div>

                  <div className='text-sm leading-6'>
                    <p className='font-semibold text-green-600 hover:text-green-500 cursor-pointer'>
                      Forgot password?
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    type='submit'
                    className='flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:bg-green-950 disabled:cursor-not-allowed'
                    disabled={!(email && password.length >= 8) || isLoading}
                    // disabled={true}
                  >
                    {isLoading ? 'Loading...' : 'Sign in'}
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
                  Don't have an account?{' '}
                  <Link
                    to='/auth/signup'
                    className='font-semibold leading-6 text-green-600 hover:text-green-500'
                  >
                    Sign up
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
