import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    console.log(e);
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  };

  const isDisabled = () => {
    if(!name || !email || !password || !password2) {
        return true
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Card bg="light" style={{ width: "20rem" }} className="mb-2 mx-auto my-4">
        <Card.Header>
          <h2>Register</h2>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" >
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                name="name"
                value={name}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                
              />
            </Form.Group>
            <Form.Group className="mb-3" >
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
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Register;
