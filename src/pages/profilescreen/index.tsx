import React, { useState } from "react";
import { Row, Col, Button, Checkbox, Form, Input, message } from "antd";
import "./style.css";

function Profilescreen(location:any) {
    const [modalEdit, setModalEdit] = useState<Boolean>(false)

    const state = location?.location?.state?.item;

  return (
    <div className="profilescreeen">
      <div className="profileBox">
        <Row>
          <Col md={12} className="profiledetails">
            <div className="Profiletext">Profile</div>
            
            <br/>
            <br/>
            <div style={{marginLeft:"70px"}}>
              <div className="Profilelabel"> Name</div>
              
              <div style={{fontWeight:"500"}}>{state?.username}</div>
              <br/>
              <div className="Profilelabel">Email</div>
              
              <div style={{fontWeight:"500"}}>{state?.email}</div>
            </div>
          </Col>
          <Col md={12} className="profilesession">
            <br/>
            <br/>
            <br/>
            <br/>
            <div className="profilediv">
              <img className="profileicon"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              />
            </div>
            <br/>
            <Button className="editoption" 
            // onClick={setModalEdit(true)}
            >Edit</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Profilescreen;