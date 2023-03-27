import Card from "react-bootstrap/Card";

export default function Sighting(props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {`Sighting in ${props.data.SEASON}, ${props.data.YEAR}, ${props.data.STATE}`}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
