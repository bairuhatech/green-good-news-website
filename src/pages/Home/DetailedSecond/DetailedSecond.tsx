import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import {gql} from "@apollo/client";
import client from "../../../Config/Graphql/apolloclient";
import { Mainstyle } from "../../../Config/Mainstyle";
import moment from "moment";
import LikeAndShare from "../../../components/LikeAndShare";
import ButtonPrimary from "../../../components/buttonPrimary";

const DetailedSecond = () => {
  const [data, setData] = useState() as any;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    client
      .query({
        query: gql`
          query {
            exclusives {
              data {
                attributes {
                  image
                  head
                  body
                  createdAt
                }
              }
            }
          }
        `,
      })
      .then(function (response: {
        networkStatus: number;
        data: { exclusives: { data: any } };
      }) {
        if (response.networkStatus == 7) {
          let data = response.data.exclusives.data;

          setData(data);
          setLoading(false);
        }
      })

      .catch((error: any) => console.log("======>", error));
  };
  return (
    <Container>
      <div>
        <Row>
          <Col lg={8} md={12}>
            <Row>
              {data?.slice(0, 6).map((item_: any) => {
                return (
                  <Col lg={4}>
                    <div className="d-flex flex-column align-start">
                      <Row>
                        <Col>
                          <div
                            style={{ display: "grid", placeItems: "center" }}
                          >
                            <img
                              width={"200px"}
                              // max-height={"100px"}
                              style={{
                                width:"100%",
                                // width: "290px",
                                // height: "170px",
                                height:"100%",
                                borderRadius: "5px",
                              }}
                              src={
                                item_ &&
                                item_?.attributes &&
                                item_.attributes.image
                              }
                              alt="no Image"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div>
                            <span style={Mainstyle.smallTxt}>
                              {item_ &&
                                item_.attributes &&
                                item_.attributes.head &&
                                item_.attributes.head.slice(0, 80)}
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={24}>
                          <div style={{display:"flex", width:"100",justifyContent:"space-between"}}>
                            <p style={Mainstyle.middleTxt2}>
                              {item_ &&
                                item_.attributes &&
                                item_.attributes.createdAt &&
                                moment(item_.attributes.createdAt).format(
                                  "MMMM DD YYYY"
                                )}
                            </p>
                            <LikeAndShare  width={"50px"} />
                          </div>
                        </Col>
                        {/* <Col lg={4}>
                          <LikeAndShare height={"50%"} width={"80%"} />
                        </Col> */}
                      </Row>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col lg={4}>
            {data?.slice(0, 6).map((item_: any) => {
              // right 6 news after Ad
              return (
                <Row style={{ marginBottom: "5px" }}>
                  <Col sm={6}>
                    <div style={{ display: "grid", placeItems: "center" }}>
                      <img
                        style={{
                          // width: "120px",
                          width:"100%",
                          // height: "70px",
                          height:"90px",
                          borderRadius: "5px",
                        }}
                        src={item_.attributes.image}
                        alt="noImage"
                      />
                    </div>
                  </Col>
                  <Col lg={5}>
                    <p style={Mainstyle.smallTxt}>
                      {item_.attributes.head.slice(0, 50)}
                    </p>
                  </Col>
                  <Col lg={1}>
                    <div>
                      <LikeAndShare
                        width={"100%"}
                        height={"60%"}
                        direction={"column"}
                      />
                    </div>
                  </Col>
                  <br />
                </Row>
              );
            })}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default DetailedSecond;
