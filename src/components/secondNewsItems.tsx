import React, { useState } from "react";
import { Row, Col } from "antd";
import { Mainstyle } from "../Config/Mainstyle";
import moment from "moment";
import LikeAndShare from "./LikeAndShare";

function SecondNewsItems(props: any) {
  return (
    <>
      <Row className="secondNewsItm-Row">
        <Col
          lg={24}
          md={24}
          sm={24}
          xs={24}
          onClick={() => props?.onClick(props.item)}
          className="frstSctnCol1"
        >
          {props.item && (
            <img
              className="frstSctnCol1Img"
              style={{
                borderRadius: 5,
                objectFit: "cover",
              }}
              src={
                props.item &&
                props.item.attributes &&
                props.item.attributes.image &&
                props.item.attributes.image
              }
              alt="No Image"
            />
          )}
        </Col>
        <Col md={24} onClick={() => props.onClick(props.item)}>
          {props.item && (
            <div>
              <p
                style={{
                  ...Mainstyle.middleTxt3,
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
              >
                {props.item?.attributes?.head && props.item.attributes.head}
              </p>
            </div>
          )}
        </Col>
        <Col md={24} xs={24}>
          <Row className="align-items-center">
            <Col md={20} xs={20}>
              <div
                className="Dateandshare"
                style={{ ...Mainstyle.dateTimeTxt }}
              >
                <span>
                  {props.item?.attributes?.createdAt &&
                    moment(props.item.attributes.createdAt).format(
                      "D MMMM hh mm a "
                    )}
                </span>
              </div>
            </Col>

            <Col md={4} xs={4}>
              {/* <div> */}
              <LikeAndShare
                id={props?.item?.id}
                desc={props?.item?.attributes?.head}
              />
              {/* </div> */}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default SecondNewsItems;
