import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { Col, Row } from "antd";
import LikeAndShare from "../../components/LikeAndShare";
import { Mainstyle } from "../../Config/Mainstyle";
import { navigate } from "gatsby";
import "./style.scss";
import FORMAT_TIME from "../../utils/dateFormatter";
import LoadingBox from "../../components/LoadingBox/LoadingBox2";

function SearchScreen({ location, props }: any) {
  const { state } = location;
  const searchData = state?.item || [];

  useEffect(() => {
    const handleContextmenu = (e: Event) => {
      e.preventDefault();
    };
  
    document.addEventListener("contextmenu", handleContextmenu);
  
    return () => {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, [])

  const handleClick = (item: any, id: any) => {
    let permalink = "";
    if (item && item?.attributes && item?.attributes?.permalink) {
      permalink = item?.attributes?.permalink;
    }
    navigate(`/Home/DetailedNews?id=${id}/${permalink}`, {
      state: {
        item,
        id,
      },
    });
  };
  return (
    <div>
      <Header />
      {state?.loding ? (
      <main className="Container">
        <div className="ContentSection" style={{ padding: "20px" }}>
          <div className="d-md-none d-block">
            <Col
              xs={24}
              lg={7}
              className="d-flex d-md-flex searchInputContainer"
            ></Col>
          </div>
          <p style={{ marginTop: "25px", ...Mainstyle.middleTxt3 }}>
            Showing results for "{state?.data || ""}"
            {state?.item[0]?.attributes ? null : "did not match any article"}
          </p>

          <Row className="d-flex justify-content-between">
            <Col xs={24} lg={16}>
              {searchData.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <Row
                    style={{ marginTop: "20px", padding: "12px 16px" }}
                    className="align-items-center"
                    onClick={(val) => handleClick(val,item.id)}
                  >
                    <Col md={6} xs={8}>
                      <div>
                        <img
                          className="SearchScreenImage"
                          src={item.attributes.image}
                        />
                      </div>
                    </Col>
                    <Col md={18} xs={16}>
                      <p className="SearchScreenText">
                        {item?.attributes?.head}
                      </p>
                      <Col md={24}>
                        <Row justify={"space-between"}>
                          <Col className="searcScreen-Date">
                            {FORMAT_TIME(item.attributes.createdAt)}
                          </Col>
                          <Col>
                            <LikeAndShare />
                          </Col>
                        </Row>
                      </Col>
                    </Col>
                  </Row>
                  <Row className="breadcums"></Row>
                </React.Fragment>
              ))}
            </Col>
            <Col
              xs={24}
              lg={7}
              style={{ marginTop: "15px" }}
              className="d-none d-lg-block"
            >
              <img
                src={
                  "https://tpc.googlesyndication.com/simgad/12795048555322741959"
                }
                style={{ width: "100%" }}
                alt="Ad"
              />
            </Col>
          </Row>
        </div>
      </main>
      ) : (
        <LoadingBox />
      )}
    </div>
  );
}

export default SearchScreen;
