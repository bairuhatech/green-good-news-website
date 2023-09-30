import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, Button, Input } from "antd";
import { Mainstyle } from "../../Config/Mainstyle";
import { FaRegCommentDots, FaUserCircle } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import moment from "moment";
import { Skeleton } from "antd";
import { EditorialGET } from "../../utils/api";
import ButtonPrimary from "../../components/buttonPrimary";
import Advertisement from "../Home/Advertisement/Advertisement";
import BCEditorial from "../../components/BCEditorial";
import LikeAndShare from "../../components/LikeAndShare";
import Header from "../../components/header";
import ShareModal from "../../components/shareModal";
import { LuImageOff } from "react-icons/lu";

const { TextArea } = Input;

const Editorial = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState() as any;
  const [selectedIndex, setselectedIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "96%",
  };

  const iconGroupStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };
  const editorialProfile = {};

  useEffect(() => {
    loadData();
    setTimeout(() => {
      setLoading(false);
    }, 500);
    const handleContextmenu = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextmenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      let respi: any = await EditorialGET();
      console.log(respi);
      if (respi.networkStatus == 7) {
        setData(respi?.data?.editorials?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      {loading ? (
        <Skeleton active />
      ) : (
        <main className="Container">
          <div className="ContentSection">
            <Row className="detailedNewshead">
              <Col
                xl={18}
                lg={18}
                md={18}
                sm={24}
                xs={24}
                style={{ padding: "12px" }}
              >
                <BCEditorial />
                <br />
                {data && (
                  <>
                    <div>
                      <p style={Mainstyle.SubHeads} className="headDetailed">
                        {data && data[selectedIndex]?.attributes?.head}
                      </p>
                    </div>
                    <br />
                    <div className="editorialProfile">
                      <div className="editorialProfileImage">
                        {data && data[selectedIndex]?.attributes.profile ? (
                          <img
                            style={{
                              height: "35px",
                              width: "35px",
                              borderRadius: "50%",
                            }}
                            src={data[selectedIndex]?.attributes.profile}
                          />
                        ) : (
                          <FaUserCircle color="#d3d3d3" size={30} />
                        )}
                      </div>
                      <div className="author-editorial">
                        <div style={{ color: "#d3d3d3" }}>
                          {data && data[selectedIndex]?.attributes?.author}
                        </div>{" "}
                        <div style={{ color: "#d3d3d3" }}>
                          അധ്യായം:{" "}
                          {data && data[selectedIndex]?.attributes?.seriesName}
                        </div>
                      </div>
                    </div>
                    <br />
                    <div>
                      {data && data[selectedIndex]?.attributes?.image1 ? (
                        <img
                          className="Detailedmain"
                          src={data && data[selectedIndex].attributes?.image1}
                          alt="No Image"
                        />
                      ) :null}
                    </div>
                    <div className="Dateandshare" style={Mainstyle.lighttext}>
                      {data &&
                        data[selectedIndex]?.attributes?.image1_description}
                    </div>
                    <br />
                    <div style={{ width: "100%" }}>
                      <p
                        style={Mainstyle.title}
                        dangerouslySetInnerHTML={{
                          __html: data && data[selectedIndex]?.attributes?.body,
                        }}
                      ></p>
                    </div>
                    <br />
                    <div>
                      {data && data[selectedIndex]?.attributes?.image2 ? (
                        <img
                          className="Detailedmain"
                          src={data && data[selectedIndex]?.attributes?.image2}
                          alt="No Image"
                        />
                      ) : (
                        <div className="noEditorialImage">
                          <LuImageOff size={50} />
                        </div>
                      )}
                    </div>
                    <div className="Dateandshare" style={Mainstyle.lighttext}>
                      {data &&
                        data[selectedIndex]?.attributes?.image2_description}
                    </div>
                  </>
                )}
                <br />
                {data && data[selectedIndex]?.attributes?.audio ? (
                  <audio controls style={{ width: "100%" }}>
                    <source
                      src={data && data[selectedIndex]?.attributes?.audio}
                      type="audio/mpeg"
                    />
                  </audio>
                ) : null}
                <br />
                <div className="breadcums mb-3 " />
                <div style={{ width: "100%" }}>
                  <div style={containerStyle}>
                    <div style={iconGroupStyle}>
                      <AiOutlineHeart size={22} color="#363636" />
                      <span
                        style={{
                          ...Mainstyle.smallTxt,
                          marginRight: "12px",
                        }}
                      >
                        1k
                      </span>
                      <FaRegCommentDots size={22} color="#363636" />
                      <span
                        style={{
                          ...Mainstyle.smallTxt,
                          marginRight: "12px",
                        }}
                      >
                        2.5k
                      </span>
                      <TbShare3
                        size={22}
                        color="#363636"
                        cursor={"pointer"}
                        onClick={() => setIsModalVisible(true)}
                      />
                      <span
                        style={{
                          ...Mainstyle.smallTxt,
                          marginRight: "12px",
                        }}
                      >
                        1
                      </span>
                    </div>
                    <BiDotsVerticalRounded size={23} color="#363636" />
                  </div>
                </div>
                <br />
              </Col>
              <Col
                xl={6}
                lg={6}
                md={6}
                sm={0}
                xs={0}
                style={{ paddingLeft: "20px" }}
              >
                <div style={{ paddingTop: " 16px", paddingBottom: "16px" }}>
                  <img
                    className="newsImage"
                    src="https://www.shutterstock.com/image-vector/summer-musthave-products-on-geometric-600w-1096791344.jpg"
                    alt=""
                  />
                </div>
                <ButtonPrimary name={"More"} />
                <br />
                {data &&
                  data.slice(0, 16).map((item: any, index: any) => {
                    return (
                      <>
                        <div
                          className="editorialMore"
                          onClick={() => {
                            setselectedIndex(index + 4);
                            loadData();
                            window.scrollTo(0, 0);
                          }}
                        >
                          <div className="moreImageEitorial">
                            <img
                              className="frstSctnCol1Img"
                              style={{
                                borderRadius: 5,
                                objectFit: "cover",
                                height: "80px",
                                width: "135px",
                              }}
                              src={
                                item &&
                                item.attributes &&
                                item.attributes.image1 &&
                                item.attributes.image1
                              }
                              alt="No Image"
                            />
                          </div>
                          <div className="titleEditorialNews">
                            <p
                              style={{
                                ...Mainstyle.middleTxt3,
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 3,
                              }}
                              className=""
                            >
                              {item &&
                                item.attributes &&
                                item.attributes.head &&
                                item.attributes.head.slice()}
                            </p>
                            <p>
                              <div
                                className="Dateandshare "
                                style={{ ...Mainstyle.dateTimeTxt }}
                              >
                                <span>
                                  {" "}
                                  {item?.attributes?.createdAt &&
                                    moment(item.attributes.createdAt).format(
                                      "D MMMM YYYY . hh mm a"
                                    )}
                                </span>
                              </div>
                            </p>
                          </div>
                        </div>
                        <br />
                        <Row className="breadcums"></Row>
                        <br />
                      </>
                    );
                  })}
              </Col>
            </Row>
            <Row className="commentBox">
              <Col
                md={18}
                style={{
                  background: "#F3F3F3",
                  height: "100%",
                  padding: "16px",
                }}
              >
                <Col>
                  <p style={{ ...Mainstyle.middleTxt2, marginBottom: "10px" }}>
                    Comment
                  </p>
                </Col>
                <TextArea
                  rows={4}
                  className="typeBox"
                  autoSize={false}
                  placeholder="Type here...."
                  style={{ height: 80, border: "none", marginBottom: "10px" }}
                />
                <Col>
                  <span className="CommentDisclaimer">
                    <strong>Disclaimer:</strong> "The website reserves the right
                    to moderate, edit, or remove any comments that violate the
                    guidelines or terms of service."
                  </span>
                </Col>
                <Col className="mt-2">
                  <Button
                    danger
                    style={{
                      color: "#0055A6",
                      borderColor: "#0055A6",
                      marginRight: 12,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ backgroundColor: "#0055A6", color: "#ffff" }}
                  >
                    Submit
                  </Button>
                </Col>
              </Col>
            </Row>
            <br />
            <br />
            <ButtonPrimary name={"Related"} />
            <br />
            <Row>
              {data &&
                data.slice(0, 4).map((item: any, index: any) => {
                  return (
                    <Col
                      xl={8}
                      lg={8}
                      md={8}
                      sm={8}
                      style={{ padding: "12px" }}
                      onClick={() => {
                        setselectedIndex(index + 1);
                        loadData();
                        window.scrollTo(0, 0);
                      }}
                    >
                      <Col xl={24} lg={24} md={24} sm={24}>
                        <img
                          className="frstSctnCol1Img"
                          style={{
                            borderRadius: 5,
                            objectFit: "cover",
                          }}
                          src={
                            item &&
                            item.attributes &&
                            item.attributes.image1 &&
                            item.attributes.image1
                          }
                          alt="No Image"
                        />
                      </Col>
                      <Col xl={24} lg={24} md={24} sm={24}>
                        <Col>
                          <div>
                            <p
                              style={{
                                ...Mainstyle.middleTxt3,
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 3,
                              }}
                              className=""
                            >
                              {item &&
                                item.attributes &&
                                item.attributes.head &&
                                item.attributes.head.slice()}
                            </p>
                            <p>
                              <div
                                className="Dateandshare "
                                style={{ ...Mainstyle.dateTimeTxt }}
                              >
                                <span>
                                  {" "}
                                  {item?.attributes?.createdAt &&
                                    moment(item.attributes.createdAt).format(
                                      "D MMMM YYYY . hh mm a"
                                    )}
                                </span>
                              </div>
                            </p>
                          </div>
                        </Col>
                      </Col>
                    </Col>
                  );
                })}
            </Row>
            <Row>
              <Advertisement
                width={"100%"}
                adsTilte={
                  " https://s01.sgp1.digitaloceanspaces.com/large/868650-43870-qczporqhod-1476987508.jpg"
                }
              />
            </Row>
          </div>
        </main>
      )}
      {isModalVisible ? (
        <ShareModal
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          closable={false}
        />
      ) : null}
    </>
  );
};
export default Editorial;
