/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  return user ? (
    <div>
      <Sidebar user={user} />
      <div className='pl-0 lg:pl-72'>{children}</div>
    </div>
  ) : (
    <Navigate to='/auth/login' from={location} replace />
  );
};

export default Dashboard;
