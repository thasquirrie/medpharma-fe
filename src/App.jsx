import { Routes, Route } from 'react-router-dom';
import './App.css';
import NotFound from './pages/NotFound';
import Login from './pages/Auth/Login';

import VerifyEmail from './pages/VerifyEmail';
import Homepage from './pages/Homepage';

import ScrollToTop from './components/ScrollToTop';
import PatientSignup from './pages/Auth/PatientSignup';
import OfficerSignup from './pages/Auth/OfficerSignup';
import { Users } from './pages/Dashboard/Users';
import Home from './pages/Dashboard/Home';
import { Consultations } from './pages/Dashboard/Consultations';
import { PatientConsultations } from './pages/Dashboard/PatientConsultations';
import CreateConsultation from './pages/Dashboard/CreateConsultation';
import Consultation from './pages/Dashboard/Consultation';

function App() {
  // const location = useLocation();
  // const [showHeader, setShowHeader] = useState(true);

  // // Hide header on dashboard page
  // if (location.pathname.startsWith('/dashboard')) {
  //   setShowHeader(false);
  // } else {
  //   setShowHeader(true);
  // }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Homepage />} />

        <Route path='/verify' element={<VerifyEmail />} />

        <Route path='/auth'>
          <Route path='login' element={<Login />} />
          <Route path='patient/signup' element={<PatientSignup />} />
          <Route path='officer/signup' element={<OfficerSignup />} />
        </Route>

        <Route path='/dashboard'>
          <Route path='patients' element={<Users />} />
          <Route path='consultations' element={<Consultations />} />
          <Route path='consultations/create' element={<CreateConsultation />} />
          <Route path='consultations/:id' element={<Consultation />} />
        </Route>
        <Route path='/patient'>
          <Route path='home' element={<Home />} />
          <Route path='consultations' element={<PatientConsultations />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
