import { useSelector, useDispatch } from "react-redux";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            {user ? (
              <>
                <Link className="nav-link" to="/">
                  Dashboard
                </Link>
                <Link className="nav-link" to="/login">
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
