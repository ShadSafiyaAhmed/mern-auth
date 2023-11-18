import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminHeader from './components/AdminHeader';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin')
  return (
    <>
    {isAdmin ? <AdminHeader /> : <Header /> }
    
    <ToastContainer />
    <Container className='my-2'>
        <Outlet />
    </Container>
     
    </>
  )
}

export default App