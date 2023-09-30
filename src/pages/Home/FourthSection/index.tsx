import React from "react";
import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { Skeleton } from "antd";
import { navigate } from "gatsby";
import moment from "moment";
import { AllNews } from "../../../../src/utils/api";
import NewsItemText from "../../../components/newsItemText";
import ThirdnewsItem from "../../../components/thirdNewsItem";
import NewsItem from "../../../components/newsItem";

const SecondSection = (props: any) => {
  const [exclusiveData, setExclusiveData] = useState() as any;
  const [loading, setLoading] = useState<boolean>(true);
  const [businessData, setBusinessData] = useState() as any;
  const [entertainmentData, setEntertainmentData] = useState() as any;

  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 8000);
  }, []);
  const loadData = async () => {
    try {
      let category = `in: ["Education", "Business", "Entertainment"]`;
      let allNews: any = await AllNews(category);
      if (allNews.networkStatus == 7) {
        const allNewsData = allNews?.data?.allNews?.data;

        let exclusive: any = [];
        let business: any = [];
        let entertainment: any = [];
        for (let i = 0; i < allNewsData?.length; i++) {
          let item = allNewsData[i]?.attributes?.categories?.data;
          for (let j = 0; j < item?.length; j++) {
            if (item[j]?.attributes?.category === "Exclusive") {
              exclusive?.push(allNewsData[i]);
            }
            if (item[j]?.attributes?.category === "Business") {
              business?.push(allNewsData[i]);
            }
            if (item[j]?.attributes?.category === "Entertainment") {
              entertainment?.push(allNewsData[i]);
            }
          }
        }
        setExclusiveData(exclusive);
        setBusinessData(business);
        setEntertainmentData(entertainment);
        setLoading(false);
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
        <Skeleton />
      ) : (
        <Col span={24} className="">
          <Row>
            <Col xxl={8} lg={7} className="d-none d-lg-block">
              {/* FIRST COLUMN */}
              {entertainmentData?.slice(0, 15).map((item_: any, index: any) => {
                return (
                  <>
                    <NewsItemText
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 14 && <Row className="breadcums"></Row>}
                  </>
                );
              })}
            </Col>
            <Col xxl={8} lg={10} md={12} sm={12} xs={24}>
              {/* SECOND ROW SECTION OF SECOND COLUMN */}
              {businessData?.slice(0, 12).map((item_: any, index: any) => {
                return (
                  <>
                    <ThirdnewsItem
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 11 && <Row className="breadcums"></Row>}
                  </>
                );
              })}
            </Col>
            {/* THIRD COLUMN */}
            <Col xxl={8} lg={7} md={12} sm={12} xs={24}>
              {entertainmentData?.slice(0, 17).map((item_: any, index: any) => {
                return (
                  <>
                    <NewsItem
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 17 && <Row className="breadcums"></Row>}
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
