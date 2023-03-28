import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Bigfoot sightings</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="filter">Filter</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
