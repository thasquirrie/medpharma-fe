import { useEffect, useState } from 'react';
import ModifiedInput from './ModifiedInput';
import ProjectUploadInput from './ProjectUploadInput';
import SelectOptions from './SelectOptions';
import TextArea from './TextArea';
import TwoColumnInput from './TwoColumnInput';
import {
  useCreateProjectMutation,
  useLazyGetProjectsQuery,
} from '../app/services/dashboard';
import ProjectDocumentsUpload from './ProjectDocumentsUpload';
import Alert from './Alert';
import { lazyQueryOptions } from '../utils/queryOptions';
import LoadingPage from './LoadingPage';
import EmptyProjectStates from './EmptyProjectState';
import ProjectsComponent from './ProjectsComponent';
import FormModal from './FormModal';

const options = [
  { name: 'Agriculture' },
  { name: 'Carbon Capture & Storage' },
  { name: 'Forestry & Land Use' },
  { name: 'Household & Community' },
  { name: 'Industrial & Commercial' },
  { name: 'Renewable Energy' },
  { name: 'Transportation' },
  { name: 'Waste Management' },
];

const countries = [
  { name: 'Nigeria' },
  { name: 'United States' },
  { name: 'Canada' },
  { name: 'United Kingdom' },
];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Project = () => {
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    country: '',
    location: '',
    longitude: '',
    latitude: '',
    landSize: '',
    year: '',
    credits: '',
    price: '',
    description: '',
    image: '',
  });

  const [docImg, setDocImg] = useState('');
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [project, setProject] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'file' ? e.target.files[0] : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const [triggerGetProjects, { isLoading: getProjectsLoading, data }] =
    useLazyGetProjectsQuery(lazyQueryOptions);

  useEffect(() => {
    if (!data) triggerGetProjects();
  }, [data, triggerGetProjects]);

  const [createProject, { isLoading, isSuccess }] = useCreateProjectMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (key === 'longitude' || key === 'latitude') {
        formDataToSend.append('coordinates.coordinates[]', formData[key]);
      } else if (key === 'image' && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else if (key === 'documents' && formData[key]) {
        const documents = formData[key];
        for (let i = 0; i < documents.length; i++) {
          formDataToSend.append('documents', documents[i]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const result = await createProject(formDataToSend).unwrap();
      setAlert(true);
      result.error
        ? setMessage(result.error.data.message)
        : setMessage('Project saved successfully!');

      setForm(false);
      triggerGetProjects();
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
            <p className='text-lg font-medium text-[#101828]'>
              Manage Projects
            </p>
            <p className='text-sm font-normal text-[#667085]'>
              Update details about your projects here.
            </p>
          </div>
        </div>
        {getProjectsLoading ? (
          <LoadingPage />
        ) : (
          <>
            {form ? (
              <form
                onSubmit={handleSubmit}
                className={classNames(form ? 'block' : 'hidden')}
              >
                <div className='space-y-6'>
                  <div className='mt-6'>
                    <ModifiedInput
                      label={'Project name'}
                      name={'title'}
                      placeholder={'Name of Project'}
                      onChange={handleInputChange}
                      formData={formData}
                    />
                  </div>
                  <SelectOptions
                    name={'type'}
                    label={'Project Type'}
                    options={options}
                    setFormData={setFormData}
                    formData={formData}
                  />
                  <SelectOptions
                    name={'country'}
                    label={'Country'}
                    options={countries}
                    setFormData={setFormData}
                    formData={formData}
                  />
                  <ModifiedInput
                    label={'Location'}
                    name={'location'}
                    placeholder={'Location'}
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                  <TwoColumnInput
                    longitude={formData.longitude}
                    latitude={formData.latitude}
                    onChangeHandler={handleInputChange}
                  />
                  <ModifiedInput
                    label={'Land Size'}
                    name={'landSize'}
                    placeholder={'8,000'}
                    value={formData.landSize}
                    onChange={handleInputChange}
                  />
                  <ModifiedInput
                    label={'Year of establishment'}
                    name={'year'}
                    placeholder={'2024'}
                    value={formData.year}
                    onChange={handleInputChange}
                  />
                  <ModifiedInput
                    label={'Available Credits'}
                    name={'credits'}
                    placeholder={'8,0000'}
                    value={formData.credits}
                    onChange={handleInputChange}
                  />
                  <ModifiedInput
                    label={'Carbon Credit Price'}
                    name={'price'}
                    placeholder={'$49.90'}
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                  <TextArea
                    label={'About Project'}
                    value={formData.description}
                    onChange={handleInputChange}
                    name={'description'}
                    placeholder={'Project description'}
                  />
                  <ProjectUploadInput
                    label={'Project Image'}
                    name={'image'}
                    setDocImg={setDocImg}
                    formData={formData}
                    setFormData={setFormData}
                    img={docImg}
                  />
                  <ProjectDocumentsUpload
                    label={'Project Documents'}
                    name={'documents'}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>

                <div className='mt-6 flex items-center justify-end gap-x-6 mb-12'>
                  <button
                    type='button'
                    className='text-sm font-semibold leading-6 text-gray-900 border px-3 py-2 rounded-md'
                    onClick={() => setForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className='rounded-md bg-[#48A928] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#a4ee8c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#48A928]'
                  >
                    {isLoading ? 'Saving project...' : 'Save'}
                  </button>
                </div>
              </form>
            ) : data?.results === 0 ? (
              <EmptyProjectStates form={form} setForm={setForm} />
            ) : (
              <>
                {editForm && (
                  <FormModal
                    show={editForm}
                    setShow={setEditForm}
                    project={project}
                  />
                )}
                {data?.data?.data.map((project, index) => (
                  <ProjectsComponent
                    key={project.id}
                    project={project}
                    index={index}
                    button={true}
                    setEditForm={setEditForm}
                    editForm={editForm}
                    setProject={setProject}
                  />
                ))}
              </>
            )}
          </>
        )}
        <div>
          {data?.results !== 0 && !form && (
            <p
              onClick={() => setForm(true)}
              className='text-[#48a928] py-4 px-3 w-[12rem] cursor-pointer '
            >
              Add new project
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Project;
