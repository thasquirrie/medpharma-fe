/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Main = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  return user ? (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  ) : (
    <Navigate to='/auth/login' from={location} replace />
  );
};

export default Main;
