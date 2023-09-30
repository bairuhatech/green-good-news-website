import React from "react";
import { Row, Col } from "antd";
import moment from "moment";
import LikeAndShare from "./LikeAndShare";
import { Mainstyle } from "../Config/Mainstyle";

function ThirdnewsItem(props: any) {
  return (
    <>
      <Row className="thirdNewsItem-Row">
        <Col
          xxl={6}
          xl={8}
          lg={10}
          md={10}
          xs={8}
          onClick={() => props?.onClick?.(props?.item)}
        >
          {props.item && props?.item?.attributes?.image && (
            <img
              className="frstSctnCol3Img"
              src={props?.item?.attributes?.image}
              alt="No Image"
            />
          )}
        </Col>
        <Col
          xxl={18}
          xl={16}
          lg={14}
          md={14}
          xs={16}
          className="thirdNewsItem-Col2"
        >
          <Col md={24} onClick={() => props?.onClick?.(props?.item)}>
            <div className=" thrdNewsItm-Col3Txt">
              <p
                className="thirdnewsItm-Row1HeadTxt"
                style={{
                  ...Mainstyle.middleTxt,
                }}
              >
                {props?.item?.attributes?.head}
              </p>
            </div>
          </Col>
          <Col md={24} style={{ paddingTop: 10 }}>
            <Row>
              <Col md={16} xs={18} style={{ ...Mainstyle.dateTimeTxt }}>
                {props?.item?.attributes?.createdAt &&
                  moment(props?.item?.attributes?.createdAt).format(
                    "D MMMM hh mm a "
                  )}
              </Col>
              <Col md={8} xs={6}>
                <LikeAndShare
                  id={props?.item?.id}
                  desc={props?.item?.attributes?.head}
                />
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
    </>
  );
}

export default ThirdnewsItem;
