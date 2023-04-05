import { useState, useEffect } from "react";
import { BACKEND_URL } from "../Constants";
import axios from "axios";
import { Button, Form, ListGroup } from "react-bootstrap";

export default function Comments(props) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getComments();
  }, [newComment]);

  const getComments = async () => {
    let commentsResponse = await axios.get(
      `${BACKEND_URL}/sightings/${props.sightingId}/comments`
    );
    setComments(commentsResponse.data);
  };

  const renderComments = () => {
    if (comments.length > 0) {
      return comments.map((comment) => (
        <ListGroup.Item className="comment" key={comment.id}>
          <div className="comment-content">{comment.content}</div>
          <div className="comment-info">{comment.createdAt}</div>
        </ListGroup.Item>
      ));
    } else {
      return <div>No comments yet</div>;
    }
  };

  const renderCommentForm = () => {
    return (
      <Form onSubmit={handleSubmitComment}>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows={2}
            value={newComment}
            placeholder="Your comment goes here."
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit">Submit</Button>
        </Form.Group>
      </Form>
    );
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (newComment) {
      try {
        const comment = await axios.post(
          `${BACKEND_URL}/sightings/${props.sightingId}/comments`,
          { content: newComment, sightingId: props.sightingId }
        );
        setNewComment("");
      } catch (err) {
        console.log(err.message);
      }
    } else {
      alert("Please write a comment before submitting.");
    }
  };

  return (
    <>
      <h5>Comments</h5>
      <ListGroup className="comments-container">{renderComments()}</ListGroup>
      {renderCommentForm()}
    </>
  );
}
