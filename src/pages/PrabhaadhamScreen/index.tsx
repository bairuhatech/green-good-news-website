import React, { useEffect, useState } from "react";
import LoadingBox from "../../components/LoadingBox/LoadingBox2";
import Header from "../../components/header";
import { Mainstyle } from "../../Config/Mainstyle";
import { Row, Col, Button, Input, Card, Skeleton } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { LuImageOff } from "react-icons/lu";

import "./styles.css";

function PrabhaadhamScreen(props: any) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          <Header />
          <main className="Container">
            <div className="ContentSection">
              <br />
              <br />
              <Row>
                <Col xl={18} lg={18} md={18} sm={18} xs={24}>
                  <div className="head-PrabhaadhamScreen">
                    <p style={Mainstyle.SubHeads}>
                      {props?.location?.state?.item?.attributes?.title}
                    </p>
                  </div>
                  <br />
                  <hr />
                  <br/>
                  <div className="authorDiv">
                  <div className="PrabhaadhamScreenProfileImage">
                    {props?.location?.state?.item?.attributes?.profile ? (
                      <img
                        style={{
                          height: "35px",
                          width: "35px",
                          borderRadius: "50%",
                        }}
                        src={props?.location?.state?.item?.attributes?.profile}
                      />
                    ) : (
                      <FaUserCircle color="#d3d3d3" size={30} />
                    )}
                  </div>
                  <div className="AuthorName">{props?.location?.state?.item?.attributes?.Author}</div>
                  </div>
                  <br/>
                  <div>
                      {props?.location?.state?.item?.attributes?.image1 ? (
                        <img
                          className="Detailedmain"
                          src={props?.location?.state?.item?.attributes?.image1}
                          alt="No Image"
                        />
                      ) : null}
                  </div>
                  <br/>
                  <div style={{ width: "100%" }}>
                      <p
                        style={Mainstyle.title}
                        dangerouslySetInnerHTML={{
                          __html:props?.location?.state?.item?.attributes?.Body,
                        }}
                      ></p>
                   </div>
                </Col>
                <Col xl={6} lg={6} md={6} sm={6} xs={0}></Col>
              </Row>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default PrabhaadhamScreen;
