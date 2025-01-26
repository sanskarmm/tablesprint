import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup-login.css';
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { TablesprintState } from '../contexts/TablesprintContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { setUser } = TablesprintState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      let { data } = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/home", { replace: true });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      toast({
        title: "Login failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container fluid className="login-page d-flex justify-content-center align-items-center">
      <Row className="login-container p-5">
        <img src="/singup-bg_image.png" id='bg' />
        <div className="blue-overlay"></div>
        <Col xs={8} md={10} lg={12} className="mx-auto my-auto">
          <div className="text-center mb-4">
            <img src="/tablesprint_logo.png" alt="Logo" className="login-logo mb-3" />
            <h5>Welcome to TableSprint admin</h5>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group className='d-flex align-items-center' as={Col} controlId="formEmail" xs={12} md={4} lg={4}>
                <Form.Label>Email-id</Form.Label>
              </Form.Group>
              <Form.Group as={Col} xs={12} md={8} lg={8}>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group className='d-flex align-items-center' as={Col} controlId="formPassword" xs={12} md={4} lg={4}>
                <Form.Label>Password</Form.Label>
              </Form.Group>
              <Form.Group as={Col} xs={12} md={8} lg={8}>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-end mb-3">
              {/* Use Link for client-side routing */}
              <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
            </div>
            <Button variant="primary" type="submit" className="w-100">
              Log In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
