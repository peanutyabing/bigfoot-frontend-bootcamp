import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Bigfoot sightings</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            onClick={() => {
              navigate("/report-sighting");
            }}
          >
            Report a sighting
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate("/filter");
            }}
          >
            Search
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
