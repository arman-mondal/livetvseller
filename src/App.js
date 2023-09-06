import logo from './logo.svg';
import '@fontsource/roboto/300.css'
import "./App.css"
import Error from './Pages/Error';
import { BrowserRouter as Router ,Route,Routes } from 'react-router-dom';
import AdminSignIn from './Pages/Admin/Login';
import AdminDashboard from './Pages/Admin/Dashboard';
import SubAdminSignIn from './Pages/SubAdmin/SignIn';
import SubAdminDashboard from './Pages/SubAdmin/Dashboard/Dashboard';
import UserDashboard from './Pages/User/Dashboard';
import ClearKeyVideoPlayer from './Pages/User/ShakaPlayer';
import ResellerSignIn from './Pages/SubAdmin/SignIn';
import ResellerLogin from './Pages/Reseller/SignIn';
import ResellerDashboard from './Pages/Reseller/Dashboard';
import UserSignIn from './Pages/User/SignIn';
import ShakaPlayer from './Pages/User/ShakaPlayer';

function App() {
  return (
    <Router>
<Routes>
  <Route path='/' element={<UserSignIn/>} />
  <Route path='/admin/signin' element={<AdminSignIn/>}/>
  <Route path='/admin/dashboard/1002' element={<AdminDashboard/>}/>
  <Route path='/subadmin/signin' element={<SubAdminSignIn/>}/>
  <Route path='/subadmin/dashboard/1003' element={<SubAdminDashboard/>}/>
<Route path='/reseller/signin' element={<ResellerLogin/>}/>
<Route path='/reseller/dashboard/1004' element={<ResellerDashboard/>}/>
<Route path='/user/signin' element={<UserSignIn/>}/>
<Route path='/user/dashboard/' element={<UserDashboard/>}/>
<Route path='/livetv' element={<ShakaPlayer/>}/>
  <Route path='/*' element={<ShakaPlayer   />} />
</Routes>

      </Router>
  );
}

export default App;
