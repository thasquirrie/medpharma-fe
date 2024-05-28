import { useEffect, useState } from 'react';
import ModifiedInput from '../../components/ModifiedInput';
import SelectOptions from '../../components/SelectOptions';
import TextArea from '../../components/TextArea';
import Alert from '../../components/Alert';
import Dashboard from '../../components/Dashboard/Dashboard';
import {
  useCreateConsultationMutation,
  useLazyGetAllPatientsQuery,
  useLazyGetProvidersQuery,
} from '../../app/services/dashboard';
import { lazyQueryOptions } from '../../utils/queryOptions';
import LoadingPage from '../../components/LoadingPage';
import PatientsOptions from '../../components/PatientsOptions';
import ProviderOptions from '../../components/ProviderOptions';

const options = [
  { name: 'physical' },
  { name: 'virtual' },
  { name: 'emergency' },
  { name: 'specialist' },
];

const CreateConsultation = () => {
  const [formData, setFormData] = useState({
    patient: '',
    type: '',
    time: '',
    date: '',
    notes: '',
    condition: '',
  });

  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  //   useEffect(() => {
  //     if (!data) triggerGetProjects();
  //   }, [data, triggerGetProjects]);

  const [triggerGetPatients, { data: patients, isLoading: patientLoading }] =
    useLazyGetAllPatientsQuery(lazyQueryOptions);

  const [createConsultation, { isLoading, isSuccess }] =
    useCreateConsultationMutation();

  const [
    triggerGetProviders,
    { data: providers, isLoading: providersLoading },
  ] = useLazyGetProvidersQuery(lazyQueryOptions);

  useEffect(() => {
    triggerGetPatients();
    triggerGetProviders();
  }, [triggerGetPatients, triggerGetProviders]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createConsultation(formData).unwrap();
      setAlert(true);
      setMessage(result.message);
      // result.error
      //   ? setMessage(result.error.data.message)
      //   : setMessage('Consultation created successfully!');
    } catch (err) {
      console.log({ err });
      if (err?.data?.message) {
        console.log({ err });

        setAlert(true);
        setMessage(err.data.message);
      } else {
        // setLoginError('Something went wrong, Try again later!');
        setAlert(true);
        setMessage('Something went wrong, Try again later!');
      }
    }
  };

  return (
    <Dashboard>
      <Alert
        alert={alert}
        isSuccess={isSuccess}
        message={message}
        setAlert={setAlert}
      />
      {patientLoading || providersLoading ? (
        <LoadingPage />
      ) : (
        <div className='divide-y-2'>
          <div className='pl-8 flex flex-row justify-between py-8'>
            <div className='flex flex-col'>
              <p className='text-lg font-medium text-[#101828]'>
                Create Consultation
              </p>
              <p className='text-sm font-normal text-[#667085]'>
                Create a consultation for a patient.
              </p>
            </div>
          </div>
          <>
            <form onSubmit={handleSubmit} className='pl-8 block'>
              <div className='space-y-6'>
                <div></div>
                <SelectOptions
                  name={'type'}
                  label={'Consultation Type'}
                  options={options}
                  setFormData={setFormData}
                  formData={formData}
                />
                <PatientsOptions
                  name={'patient'}
                  label={'Patient'}
                  options={patients?.data?.data}
                  setFormData={setFormData}
                  formData={formData}
                />
                <ProviderOptions
                  name={'provider'}
                  label={'Provider'}
                  options={providers?.data?.providers}
                  setFormData={setFormData}
                  formData={formData}
                />
                <ModifiedInput
                  label={'Medical Condition'}
                  name={'condition'}
                  placeholder={'e.g Headache'}
                  value={formData.condition}
                  onChange={handleInputChange}
                />

                <ModifiedInput
                  label={'Date'}
                  name={'date'}
                  type={'date'}
                  // placeholder={'16:00'}
                  value={formData.date}
                  onChange={handleInputChange}
                />
                <ModifiedInput
                  label={'Time'}
                  name={'time'}
                  placeholder={'16:00'}
                  value={formData.time}
                  onChange={handleInputChange}
                />
                <TextArea
                  label={'Notes'}
                  value={formData.notes}
                  onChange={handleInputChange}
                  name={'notes'}
                  placeholder={'Notes'}
                />
              </div>

              <div className='px-8 mt-6 flex items-center justify-end gap-x-6 mb-12'>
                <button
                  type='button'
                  className='text-sm font-semibold leading-6 text-gray-900 border px-3 py-2 rounded-md'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='rounded-md bg-[#48A928] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#a4ee8c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#48A928]'
                >
                  {isLoading ? 'Creating consultation...' : 'Create'}
                </button>
              </div>
            </form>
          </>
        </div>
      )}
    </Dashboard>
  );
};

export default CreateConsultation;
