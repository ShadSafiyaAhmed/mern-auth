import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useAdminLogoutMutation } from '../slices/adminApiSlice';
import { adminLogout } from '../slices/adminAuthSlice';
import React from 'react'
import { useNavigate } from 'react-router-dom';




const AdminHeader = ()=> {
    const {adminInfo} = useSelector((state)=> state.adminAuth)
    const [adminLogoutApiCall] = useAdminLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const logoutHandler = async ()=>{
        try {
            await adminLogoutApiCall().unwrap();
            dispatch(adminLogout());
            navigate('/admin')

        } catch (err) {
            console.log(err);
        }
    }
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <Container>
                <LinkContainer to='/admin'>
                <Navbar.Brand>Admin Authentication</Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                        {adminInfo ? (
                            <>
                            <NavDropdown title={adminInfo.name} id = 'username'>
                                <LinkContainer to = '/admin/profile'>
                                    <NavDropdown.Item>
                                        Profile
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to = '/admin/logout'>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                            </>
                        ) : 
                        (
                            <>
                            <LinkContainer to='/admin/login'>
                            <Nav.Link >
                                <FaSignInAlt/>Sign In
                            </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/admin/register'>
                            <Nav.Link>
                                <FaSignOutAlt/>Sign Up
                            </Nav.Link>
                            </LinkContainer>
                            </>
                        )}
                       
                       
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default AdminHeader