import React from "react";
import { Row, Col } from "antd";
import { Mainstyle } from "../Config/Mainstyle";
import moment from "moment";
import LikeAndShare from "./LikeAndShare";

function NewsItemText(props: any) {
  return (
    <>
      <Row className="newsItemTxt-Row1 ">
        <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
          <Col>
            {props.item && (
              <>
                <div onClick={() => props.onClick(props.item)}>
                  <p
                    style={{
                      ...Mainstyle.middleTxt,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                    }}
                    className=""
                  >
                    {props.item &&
                      props.item.attributes &&
                      props.item.attributes.head &&
                      props.item.attributes.head.slice()}
                  </p>
                </div>

                <p>
                  <div
                    className="Dateandshare "
                    style={{ ...Mainstyle.dateTimeTxt }}
                  >
                    <div onClick={() => props.onClick(props.item)}>
                      {" "}
                      {props.item?.attributes?.createdAt &&
                        moment(props.item.attributes.createdAt).format(
                          "D MMMM hh mm a"
                        )}
                    </div>
                    <div>
                      <LikeAndShare
                        id={props?.item?.id}
                        desc={props?.item?.attributes?.head}
                      />
                    </div>
                  </div>
                </p>
              </>
            )}
          </Col>
        </Col>
      </Row>
    </>
  );
}

export default NewsItemText;
