import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import PrivateRoute from './components/PrivateRoute.jsx'
import store from "./store.js";
import { Provider } from "react-redux"; 

//imports which is related to admin page

import AdminHomeScreen from "./screens/AdminHomeScreen.jsx";
import AdminLoginScreen from "./screens/AdminLoginScreen.jsx";
import AdminRegisterScreen from "./screens/AdminRegisterScreen.jsx";
import { AdminPrivateRoute } from "./components/AdminPrivateRoute.jsx";
import AdminProfileScreen from "./screens/AdminProfileScreen.jsx";
import UsersList from "./screens/UsersList.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/*================================= user route handler========================================== */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element = {<PrivateRoute/>}>
        <Route path="/profile" element={<ProfileScreen />} /> 
      </Route>
      {/*================================= admin route handler========================================== */}

      <Route index={true} path="/admin" element={<AdminHomeScreen />} />
      <Route path="/admin/login" element={<AdminLoginScreen />} />
      <Route path="/admin/register" element={<AdminRegisterScreen />} />
      <Route path="" element = {<AdminPrivateRoute />}>
        <Route path="/admin/profile" element={<AdminProfileScreen />} /> 
      </Route>
      <Route path="/admin/usersList" element={<UsersList />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);