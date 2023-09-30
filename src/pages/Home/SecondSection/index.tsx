import React from "react";
import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { navigate } from "gatsby";
import { Skeleton } from "antd";
import moment from "moment";
import { AllNews } from "../../../../src/utils/api";
import ButtonPrimary from "../../../components/buttonPrimary";
import AdsVideoUploader from "../../../components/AdsVideoUploader";
import NewsItem from "../../../components/newsItem";
import NewsItemText from "../../../components/newsItemText";
import SecondNewsItems from "../../../components/secondNewsItems";
import Currency from "../../../components/currency";
const SecondSection = () => {
  const [sportsNews, setSportsNews] = useState([]) as any;
  const [loading, setLoading] = useState<boolean>(true);
  const [exclusiveNews, setExclusiveNews] = useState([]) as any;
  const [internationalNews, setInternationalNews] = useState([]) as any;

  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 5000);
  }, []);
  const loadData = async () => {
    try {
      let category = ` in: ["Exclusive", "sports","International"]`;
      let allNews: any = await AllNews(category);
      if (allNews.networkStatus == 7) {
        const allNewsData = allNews?.data?.allNews?.data;
        let exclusive: any = [];
        let sports: any = [];
        let international: any = [];
        for (let i = 0; i < allNewsData?.length; i++) {
          let item = allNewsData[i]?.attributes?.categories?.data;
          for (let j = 0; j < item.length; j++) {
            if (item[j]?.attributes?.category === "Exclusive") {
              exclusive?.push(allNewsData[i]);
            }
            if (item[j]?.attributes?.category === "sports") {
              sports?.push(allNewsData[i]);
            }
            if (item[j]?.attributes?.category === "International") {
              international?.push(allNewsData[i]);
            }
          }
        }
        setLoading(false);
        setExclusiveNews(exclusive);
        setSportsNews(sports);
        setInternationalNews(international);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <Col span={24}>
          <Row className="mt-3">
            {/* FIRST COLUMN */}
            <Col xxl={8} lg={7} className="d-none d-lg-block">
              {exclusiveNews?.slice(0, 10).map((item_: any) => {
                return (
                  <>
                    <NewsItem
                      newsData={"exclusiveNews"}
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    <Row className="breadcums"></Row>
                  </>
                );
              })}
              <>
                <Col lg={24} style={{ padding: "12px 16px" }}>
                  <img
                    className="newsImage3"
                    src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/product-banner-ad-design-template-cee7d4117ba01b0f661ab61a2b1080ae_screen.jpg?ts=1683227224"
                  />
                </Col>
                <Row className="breadcums "></Row>
              </>
              <ButtonPrimary name={"Exclusive News"} />

              {exclusiveNews?.slice(0, 5).map((item_: any, index: any) => {
                return (
                  <>
                    <NewsItemText
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 6 && <Row className="breadcums"></Row>}
                  </>
                );
              })}
              {/* <ButtonPrimary name={"International News"} /> */}
            </Col>
            {/*SECOND COLUM */}
            {/* ADVERTISEMENT */}
            <Col xxl={8} lg={10} md={12} sm={12} xs={24}>
              <>
                <Col
                  lg={24}
                  style={{
                    padding: "12px 16px",
                    height: "328px",
                    width: "100%",
                    borderRadius: "4px",
                  }}
                >
                  <AdsVideoUploader videoId="HHPobPyucvk" />
                </Col>
                <Row className="breadcums "></Row>
              </>
              {sportsNews?.slice(0, 4).map((item_: any, index: any) => {
                return (
                  <>
                    <SecondNewsItems
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 3 && <Row className="breadcums"></Row>}
                  </>
                );
              })}
            </Col>
            {/* THIRD COLUMN */}
            <Col xxl={8} lg={7} md={12} sm={12} xs={24} className="">
              <Currency/>
              <ButtonPrimary name={"Tech News"} className="scndSctnCol3Btn" />
              <>
                <Col
                  className="d-none d-sm-block"
                  lg={24}
                  style={{ padding: "12px 16px" }}
                >
                  <img
                    className="newsImage3"
                    src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e17c9b5b-a346-4fa0-81fa-67d02d6a12e3/4293750104/dailytube-block-ads-tube-screenshot.png"
                  />
                </Col>
                <Row className="breadcums "></Row>
              </>
              {internationalNews?.slice(0, 16).map((item_: any, index: any) => {
                return (
                  <>
                    <NewsItemText
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 15 && <Row className="breadcums"></Row>}
                  </>
                );
              })}
            </Col>
          </Row>
        </Col>
      )}
    </>
  );
};

export default SecondSection;
