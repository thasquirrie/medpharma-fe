/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import Logo from '../assets/SvgjsG1011.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useResendOTPMutation, useVerifyMutation } from '../app/services/auth';
import Alert from '../components/Alert';
import Background from '../assets/Vector.svg';

export default function VerifyEmail() {
  const timer = 300;
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');

  const [countdown, setCountdown] = useState(timer);
  const [isRequestAllowed, setIsRequestAllowed] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(
        () => setCountdown((prevCountdown) => prevCountdown - 1),
        1000
      );
    } else {
      setIsRequestAllowed(true);
    }

    // Cleanup timer
    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  useEffect(() => {
    setCountdown(timer);
  }, []);

  const [verify, { isLoading, isSuccess }] = useVerifyMutation();

  const [triggerSendOTP, { isSuccess: sendOTPSuccess }] =
    useResendOTPMutation();

  const email = localStorage.getItem('email');

  const requestOTP = async () => {
    setIsRequestAllowed(false);
    setCountdown(timer);
    setOTP(['', '', '', '', '', '']);

    try {
      const result = await triggerSendOTP({ email }).unwrap();

      const { message } = result;
      setAlert(true);
      setMessage(message);
    } catch (err) {
      console.log({ err });
      if (err?.data?.message) {
        console.log({ err });
        // setLoginError(err.data.message);
        setAlert(true);
        setMessage(err?.data?.message);
      } else {
        // setLoginError('Something went wrong, Try again later!');
        setAlert(true);
        setMessage('Something went wrong, Try again later!');
      }
    }
  };

  const navigate = useNavigate();
  const location = useLocation();

  const prevPage = location.state && location.state.prevPage;

  const handleChange = (index, event) => {
    const { value } = event.target;
    if (isNaN(value)) return; // Allow only numeric values

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value.length === 1 && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    } else if (value.length === 0 && index > 0) {
      // If the digit is deleted, focus on the previous input
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const paste = event.clipboardData.getData('Text');
    if (paste.length === otp.length && /^\d+$/.test(paste)) {
      const newOTP = paste.split('');
      setOTP(newOTP);
    }
  };
  // console.log('Length:', otp.length, otp.includes(''));

  const handleVerify = async () => {
    try {
      const result = await verify({ pin: otp.join(''), email }).unwrap();

      const { message, user } = result;
      setTimeout(() => {
        if (prevPage === 'signup') {
          navigate('/auth/login');
        } else if (prevPage === 'login') {
          if (user.role === 'officer') {
            navigate('/dashboard/patients');
          } else {
            navigate('/patient/home');
          }
        }
      }, 1000);

      setAlert(true);
      setMessage(message);
    } catch (err) {
      console.log({ err });
      if (err.data.message) {
        console.log({ err });
        // setLoginError(err.data.message);
        setAlert(true);
        setMessage(err.data.message);
      } else {
        // setLoginError('Something went wrong, Try again later!');
        setAlert(true);
        setMessage('Something went wrong, Try again later!');
      }
    }
  };

  useEffect(() => {
    const isOtpValid = otp.every((digit) => digit !== '');
    if (otp.length === 6 && isOtpValid) {
      handleVerify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  return (
    <>
      <Header />
      {alert && (
        <Alert
          isSuccess={isSuccess || sendOTPSuccess}
          message={message}
          alert={alert}
          setAlert={setAlert}
        />
      )}
      <div className='relative bg-[#002400]'>
        <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 '>
          <img
            src={Background}
            className='absolute inset-0 z-0 h-full w-full object-cover'
          />
          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[488px] z-10'>
            <div className='bg-white px-6 py-12 shadow sm:px-12'>
              <div className='sm:mx-auto sm:w-full sm:max-w-md pb-10'>
                <img className='mx-auto h-10 w-auto' src={Logo} alt='Dorewa' />
                <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                  Verify Email Address
                </h2>
                <p className='pt-3 text-sm text-gray-400 text-center'>
                  Please enter the 6-digit OTP sent to
                </p>
                <p className='pt-1 text-sm text-gray-400 text-center'>
                  {email}
                </p>
              </div>

              <form className='space-y-6' action='#' method='POST'>
                <div className='flex justify-center items-center'>
                  {otp.map((digit, index) => (
                    <input
                      key={`otp-${index}`}
                      type='text'
                      maxLength={1}
                      id={`otp-${index}`}
                      className='rounded-lg border-0 w-[40px] h-[40px] text-lg text-[#1E1818] text-center mx-1 bg-[#DCFCE7] focus:ring-2 focus:ring-inset focus:ring-green-300'
                      value={digit}
                      placeholder='-'
                      onChange={(e) => handleChange(index, e)}
                      onPaste={(e) => handlePaste(e)}
                    />
                  ))}
                </div>
              </form>
              <div className='w-full'>
                {isLoading && (
                  <span className='block pt-8 text-[#48A928] text-center w-full'>
                    Verifying
                    <span className='animate-ellipsis'></span>
                  </span>
                )}
                <p className='pt-8 text-xs text-gray-400 text-center'>
                  Code will expire in {Math.floor(countdown / 60)}:
                  {countdown % 60 < 10 ? '0' : ''}
                  {countdown % 60}
                </p>
                <p className='pt-8 text-xs text-gray-400 text-center'>
                  Didn't get the code?{' '}
                  <button
                    className='border-none font-bold text-sm text-[#1E1818] hover:text-[#937878] cursor-pointer disabled:cursor-not-allowed disabled:text-[#937878] '
                    onClick={requestOTP}
                    disabled={!isRequestAllowed}
                  >
                    Resend code
                  </button>
                </p>
                {/* <Link
                  to={'#'}
                  className='block text-center pt-6 text-xs font-bold underline text-green-500 mx-auto w-[100%]'
                >
                  Change Email address
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
