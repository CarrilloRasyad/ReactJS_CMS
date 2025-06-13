import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import UserRegister from './components/User/UserRegister.jsx';
import UserLogin from './components/User/UserLogin.jsx';
import UserProfile from './components/User/UserProfile.jsx';
import UserLogout  from './components/User/UserLogout.jsx';
import Layout from './components/Layout.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/register" element={<UserRegister/>}/>
          <Route path="/login" element={<UserLogin/>}/>
        </Route>
        <Route path="/dashboard" element={<DashboardLayout/>}>
          <Route path="users">
            <Route path="profile" element={<UserProfile/>}/>
            <Route path="logout" element={<UserLogout/>}></Route>
          </Route>
          <Route path="contacts" element={<div>Contacts</div>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
