import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

const AdminHero = () => {
  const { adminInfo } = useSelector((state) => state.adminAuth);
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">
            {adminInfo ? `Welcome ${adminInfo.name}` : "ADMIN Authentication"}
          </h1>
           <p className='text-center mb-4'>
        {adminInfo ? `Email : ${adminInfo.email}` : "This is a boilerplate for MERN authentication that stores a JWT inan HTTP-Only cookie. It also uses Redux Toolkit and the ReactBootstrap library" } 
        </p>
          <div className="d-flex">
            {adminInfo ? (
             <LinkContainer to="/admin/usersList">
                  <Button variant="primary" className="me-3">
                    Users List
                  </Button>
                </LinkContainer>
            ) : (
                <>
                <LinkContainer to="/admin/login">
                  <Button variant="primary" className="me-3">
                    Sign In
                  </Button>
                </LinkContainer>
                <LinkContainer to="/admin/register">
                  <Button variant="secondary">Sign Up</Button>
                </LinkContainer>
              </>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default AdminHero;
