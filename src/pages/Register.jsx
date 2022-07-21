import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card, Spinner } from "react-bootstrap";
import { registerUser, reset } from "../features/auth/authSlice";
import { toast } from 'react-toastify';


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(user || isSuccess) {
      navigate('/')
    }

  }, [user, isSuccess, isError, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const isDisabled = () => {
    if (!name || !email || !password || !password2) {
      return true;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if(password !== password2) {
      toast.error('Password does not match')
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(registerUser(userData));

      setFormData({
        name: "",
        email: "",
        password: "",
        password2: "",
      });
    }
    
  };

  return (
    <>
      <Card bg="light" style={{ width: "20rem" }} className="mb-2 mx-auto my-4">
        <Card.Header>
          <h2>Register</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                name="name"
                value={name}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password2"
                value={password2}
                onChange={onChange}
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="success" type="submit" disabled={isDisabled()}>
                {isLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ): 'Register'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Register;
