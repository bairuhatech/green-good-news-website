import React from "react";
import { Button, Modal } from "antd";
import { Row, Col } from "react-bootstrap";
import "./Styles.scss"


function ActionModal(props: any) {
  return (
    <Modal
      open={props.open}
      onCancel={() => props.onCancel()}
      destroyOnClose={true}
      footer={false}
      centered
    >
      <div className="ActionModal-box1">
        {props.icon}
        <div>{props.text1}</div>
        <br />
        <Row>
          <Col>
            <Button onClick={() => props.onCancel()}>Cancel</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={() => props.onOk()}>
              {props.okText}
            </Button>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}

export default ActionModal;
