import React, { useState } from "react";
import { useEffect } from "react";
import { Row, Col } from "antd";
import moment from "moment";
import ButtonPrimary from "../../../components/buttonPrimary";
import { Skeleton } from "antd";
import { navigate } from "gatsby";
import { AllNews } from "../../../../src/utils/api";
import AdsVideoUploader from "../../../components/AdsVideoUploader";
import NewsItem from "../../../components/newsItem";
import NewsItemText from "../../../components/newsItemText";

const ThirdSection = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [educationNews, setEducationNews] = useState() as any;
  const [entertainment, setEntertainment] = useState([]) as any;
  const [international, setInternational] = useState([]) as any;

  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 7000);
  }, []);
  const loadData = async () => {
    try {
      let category = `in: ["Education", "Entertainment"]`;
      let allNews: any = await AllNews(category);
      if (allNews.networkStatus == 7) {
        const allNewsData = allNews?.data?.allNews?.data;
        let entertainment: any = [];
        let education: any = [];
        let international: any = [];
        for (let i = 0; i < allNewsData?.length; i++) {
          let item = allNewsData[i]?.attributes?.categories?.data;
          for (let j = 0; j < item?.length; j++) {
            if (item[j].attributes?.category === "Entertainment") {
              entertainment?.push(allNewsData[i]);
            }
            if (item[j]?.attributes?.category === "Education") {
              education?.push(allNewsData[i]);
            }
            if (item[j]?.attributes?.category === "International") {
            }
          }
        }
        setLoading(false);
        setEntertainment(entertainment);
        setEducationNews(education);
        setInternational(international);
      }
    } catch (error) {
      console.log(error);
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
        <Col span={24} className="d-none d-lg-block">
          <Row>
            <Col xxl={8} lg={7}>
              <Col lg={24} style={{ padding: "12px 16px" }}>
                <img
                  className="newsImage3"
                  src="https://static-prod.adweek.com/wp-content/uploads/2022/07/netflix-ad-updates-2022-600x315.jpg"
                  alt=""
                />
              </Col>
              <Row className="breadcums "></Row>
              {/* FIRST COLUMN */}
              {educationNews?.slice(0, 9).map((item_: any, index: any) => {
                return (
                  <>
                    <NewsItem
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 8 && <Row className="breadcums "></Row>}
                  </>
                );
              })}
              <ButtonPrimary name={"Sci-Tech News"} />
            </Col>
            <Col xxl={8} lg={10} md={12} sm={12} xs={24} className="">
              {/* SECOND COLUMN */}
              {entertainment?.slice(0, 8).map((item_: any, index: any) => {
                return (
                  <>
                    <NewsItemText
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 7 && <Row className="breadcums "></Row>}
                  </>
                );
              })}
              <>
                <Col
                  className="advertisementCol4"
                  lg={24}
                  style={{
                    padding: "12px 16px",
                    height: "328px",
                    borderRadius: "4px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                >
                  <AdsVideoUploader videoId="6pBIkv54afA" />
                </Col>
                {/* {  <Row className="breadcums "></Row>} */}
              </>
            </Col>
            {/* THIRD COLUMN */}
            {/* ADVERTISEMENT */}
            <Col
              xxl={8}
              lg={7}
              md={12}
              sm={12}
              xs={24}
              className="d-none d-sm-block"
            >
              <Col lg={24} style={{ padding: "12px 16px" }}>
                <img
                  className="newsImage3"
                  src="https://b1681952.smushcdn.com/1681952/wp-content/uploads/2022/08/Netflix-with-ads.jpg?lossy=0&strip=1&webp=1"
                  alt=""
                />
              </Col>
              <Row className="breadcums "></Row>
              <ButtonPrimary name={"Entertainment News"} />

              {entertainment?.slice(0, 9).map((item_: any, index: any) => {
                return (
                  <>
                    <NewsItem
                      newsData={"entertainment"}
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 8 && <Row className="breadcums "></Row>}
                  </>
                );
              })}
              <ButtonPrimary name={"National News"} />
            </Col>
          </Row>
        </Col>
      )}
    </>
  );
};

export default ThirdSection;
