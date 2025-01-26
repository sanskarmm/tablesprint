import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
    };

    try {
      await axios.post(
        'http://localhost:5000/api/v1/user/forgot-password', // Update the endpoint as per your backend
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast({
        title: 'Password Reset Link Sent',
        description: 'Check your email to reset your password.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      navigate('/login'); // Redirect to login after sending the email
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong. Please try again.';
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container fluid className="forgot-password-page d-flex justify-content-center align-items-center">
      <Row className="forgot-password-container p-5">
        <Col xs={8} md={10} lg={12} className="mx-auto my-auto">
          <div className="text-center mb-4">
            <h5>Forgot Password</h5>
            <p>Enter your email address to receive a password reset link.</p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formEmail" xs={12} md={12}>
                <Form.Label>Email-id</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit" className="w-100">
              Send Reset Link
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
