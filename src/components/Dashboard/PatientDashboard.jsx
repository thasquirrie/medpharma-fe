/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PatientSidebar from './PatientSidebar';

const PatientDashboard = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  return user ? (
    <div>
      <PatientSidebar user={user} />
      <div className='pl-0 lg:pl-72'>{children}</div>
    </div>
  ) : (
    <Navigate to='/auth/login' from={location} replace />
  );
};

export default PatientDashboard;
