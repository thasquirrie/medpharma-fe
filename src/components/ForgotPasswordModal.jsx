/* eslint-disable react/prop-types */
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Input from './Input';
import { useForgotPasswordMutation } from '../app/services/auth';

export default function ForgotPasswordModal({
  show,
  setShow,
  setAlert,
  setMessage,
  setSentSuccess,
}) {
  //   const [open, setOpen] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
  });

  const handleOnChange = (e) => {
    setFormData(() => ({
      [e.target.name]: e.target.value,
    }));
  };

  const cancelButtonRef = useRef(null);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleForgotPassword = async () => {
    try {
      const result = await forgotPassword(formData).unwrap();

      console.log({ result });
      setSentSuccess(true);
      setAlert(true);
      setMessage(result.message);
      setShow(false);
    } catch (error) {
      console.log({ error });
      if (error?.data?.message) {
        setSentSuccess(false);
        setAlert(true);
        setMessage(error.data.message);
      } else {
        setSentSuccess(false);
        setAlert(true);
        setMessage('Something went wrong!');
      }
    }
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={setShow}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <div>
                  <div className=' sm:mt-1'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-semibold leading-6 text-gray-900 text-left'
                    >
                      Forgot Password
                    </Dialog.Title>
                    <p className='text-sm text-[#667085] mt-1'>
                      Input the email you registered with
                    </p>
                    <div className='mt-2'>
                      <div className='grid grid-flow-row-dense grid-cols-3 gap-3'>
                        <div className='col-span-3'>
                          <Input
                            label={'Email'}
                            name={'email'}
                            required={true}
                            placeholder={'john@example.com'}
                            type={'text'}
                            onChange={handleOnChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md bg-[#48A928] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#447434] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#48A928] sm:col-start-2'
                    onClick={() => {
                      handleForgotPassword();
                    }}
                  >
                    {isLoading ? 'Processing...' : 'Send'}
                  </button>
                  <button
                    type='button'
                    className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0'
                    onClick={() => {
                      setShow(false);
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
