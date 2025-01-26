import React, { useState } from 'react';
import { Container, Row, Col, Nav, Navbar, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Dashboard from './Dashboard';
import Category from './Category';
import Subcategory from './Subcategory';
import Products from './Products';
import { TablesprintState } from '../contexts/TablesprintContext';
import { useToast } from '@chakra-ui/react';

const Home = () => {
  const { logout } = TablesprintState();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const toast = useToast();

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'category':
        return <Category />;
      case 'subcategory':
        return <Subcategory />;
      case 'products':
        return <Products />;
      default:
        return <Dashboard />;
    }
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);

    // Display toast notification
    toast({
      title: "Logged out",
      description: "You have successfully logged out.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <div className="homepage">
      <Navbar bg="purple" variant="dark" expand="lg" className="mb-3">
        <Container fluid>
          <Navbar.Brand>
            <img src="./tablesprint_logo.png" alt="logo" className="navbar-logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link onClick={() => setShowLogoutModal(true)}>
                <i className="bi bi-person" style={{ fontSize: '1.2rem' }}></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="sidebar">
            <Nav className="flex-column">
              <Nav.Link 
                onClick={() => setActiveComponent('dashboard')} 
                className={`nav-item ${activeComponent === 'dashboard' ? 'active' : ''}`}
              >
                <i className="bi bi-house-door"></i> Dashboard
              </Nav.Link>
              <Nav.Link 
                onClick={() => setActiveComponent('category')} 
                className={`nav-item ${activeComponent === 'category' ? 'active' : ''}`}
              >
                <i className="bi bi-grid"></i> Category
              </Nav.Link>
              <Nav.Link 
                onClick={() => setActiveComponent('subcategory')} 
                className={`nav-item ${activeComponent === 'subcategory' ? 'active' : ''}`}
              >
                <i className="bi bi-list"></i> Subcategory
              </Nav.Link>
              <Nav.Link 
                onClick={() => setActiveComponent('products')} 
                className={`nav-item ${activeComponent === 'products' ? 'active' : ''}`}
              >
                <i className="bi bi-box"></i> Products
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={9} lg={10} className="main-content p-3">
            {renderComponent()}
          </Col>
        </Row>
      </Container>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Body className="text-center">
          <i className="bi bi-exclamation-triangle-fill text-danger" style={{ fontSize: '2rem' }}></i>
          <h4 className="mt-3">Log Out</h4>
          <p>Are you sure you want to log out?</p>
          <div className="d-flex justify-content-center">
            <Button variant="outline-secondary" onClick={() => setShowLogoutModal(false)} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleLogoutConfirm}>
              Confirm
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;