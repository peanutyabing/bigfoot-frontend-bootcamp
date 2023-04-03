import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Bigfoot sightings</Navbar.Brand>
        <Nav className="me-auto">
          {/* <Nav.Link href="/filter">Filter</Nav.Link> */}
          <Nav.Link href="/report-sighting">Report a sighting</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
