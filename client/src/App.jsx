import React, { useState } from 'react';

import './index.css'
import { Route, RouterProvider , createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home';
import Directory from './pages/Directory';
import RoleSelectionForm from './pages/role-selection-form';
import SignIn from './pages/public/sign-in';
import ProtectedRoutes from './routes/private-routes';
import OpenRoute from './routes/open-routes';
import Login from './components/login';
import AdminDashboard from './components/AdminDashboard';


import Mission from './pages/Mission';
import { Toaster } from 'sonner';
const App = () => {
   const [token, setToken] = useState(null);

 

  const router = createBrowserRouter(
    createRoutesFromElements(
<>
        {/* <Route path={"/sign-in"} element={<OpenRoute />}> */}
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/roles" element={<RoleSelectionForm/>} />
          <Route path="/mission" element={<Mission/>} />

        {/* </Route> */}
       
        
          <Route path="directory" element={<Directory/>} />  
       
        </>
    ),
  );

  return (

 <div className="App">
  <RouterProvider router={router} />
  <Toaster position='top-right'/>

  !token ? <Login setToken={setToken} /> : <AdminDashboard token={token} />

 </div>
 
 
      
  );


 
};



export default App;
