import React, { useState } from "react";
import { Row, Col } from "antd";
import { Mainstyle } from "../Config/Mainstyle";
import moment from "moment";
import { IoMdShare } from "react-icons/io";
import ShareModal from "./shareModal";

function NewsItem(props: any) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <>
      <Row className="newsItem-Row1">
        <Col
          xxl={6}
          xl={8}
          lg={10}
          md={10}
          xs={8}
          onClick={() => props.onClick(props?.item)}
        >
          <div>
            {/* {data?.attributes?.categories?.data?.attributes?.category ===
              "Exclusive" && ( */}
            <div className="categoryName-Box">Exclusive</div>
            {/* )} */}
            {props.item?.attributes?.isHighPriority === true ? (
              <img
                className="newsItem-image"
                src={props.item.attributes.image}
                alt="No Image"
              />
            ) : (
              <img
                className="newsItem-image"
                src={props.item.attributes.image}
                alt="No Image"
              />
            )}
          </div>
        </Col>

        <Col
          xxl={18}
          xl={16}
          lg={14}
          md={12}
          xs={16}
          style={{ paddingLeft: "14px" }}
        >
          <Col md={24} onClick={() => props.onClick(props?.item)}>
            {props.item?.attributes?.isHighPriority === true ? (
              <p style={Mainstyle.middleTxt} className="newsItem-Row1HeadTxt">
                {props.item.attributes.head}
              </p>
            ) : (
              <p style={Mainstyle.middleTxt} className="newsItem-Row1HeadTxt">
                {props.item.attributes.head}
              </p>
            )}
          </Col>

          <Col md={24}>
            <div className="Dateandshare" style={Mainstyle.dateTimeTxt}>
              {props.item?.attributes?.createdAt && (
                <div>
                  {moment(props.item.attributes.createdAt).format(
                    "D MMMM h:mm a"
                  )}
                </div>
              )}
              <div>
                <IoMdShare
                  size={12}
                  cursor={"pointer"}
                  color="rgb(54 54 54 / 50%)"
                  onClick={() => setIsModalVisible(true)}
                />
                {isModalVisible ? (
                  <ShareModal
                    open={isModalVisible}
                    id={props?.item?.id}
                    desc={props?.item?.attributes?.head}
                    onCancel={() => setIsModalVisible(false)}
                    closable={false}
                  />
                ) : (
                  ""
                )}
                {/* <LikeAndShare /> */}
              </div>
            </div>
          </Col>
        </Col>
      </Row>
    </>
  );
}

export default NewsItem;
