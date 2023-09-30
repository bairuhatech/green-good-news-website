import React from "react";
import { Row, Col, Input, Button } from "antd";
import "./styles.scss";

function CommentBox(props: any) {
  const { TextArea } = Input;
  return (
    <Row className="commentBox">
      <Col md={24} className="CommentBox-col">
        <Col>
          <p className="CommentBox-txt1">Comment</p>
        </Col>
        <TextArea
          rows={4}
          className="typeBox"
          autoSize={false}
          placeholder="Type here...."
          style={{ height: 80, border: "none", marginBottom: "10px" }}
          value={props.comment}
          onChange={(e) => props.setComment(e.target.value)}
        />
        <Col>
          <span className="CommentDisclaimer">
            <strong>Disclaimer:</strong> "The website reserves the right to
            moderate, edit, or remove any comments that violate the guidelines
            or terms of service."
          </span>
        </Col>
        <Col className="mt-2">
          <Button
            style={{ backgroundColor: "#0055A6", color: "#ffff" }}
            onClick={() => props.addComment()}
          >
            {props.user && props.user.id ? "Submit" : "SignIn to post"}
          </Button>
        </Col>
      </Col>
    </Row>
  );
}

export default CommentBox;
