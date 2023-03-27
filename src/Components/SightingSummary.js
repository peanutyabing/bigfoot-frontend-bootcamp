import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function SightingSummary(props) {
  return (
    <Link to={`/sightings/${props.sightingIndex}`}>
      <Card>
        <Card.Body>
          <Card.Title>
            {`${props.data.SEASON}, ${props.data.YEAR}, ${props.data.STATE}`}
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
}
