import React from "react";
import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { navigate } from "gatsby";
import { AllNews } from "../../../utils/api";
import NewsItem from "../../../components/newsItem";
import SecondNewsItems from "../../../components/secondNewsItems";

const SixthSection = () => {
  const [businessNews, setBusiness] = useState() as any;
  const [entertainmentNews, setEntertaimentNews] = useState() as any;
  const [loading, setLoading] = useState<boolean>(true);
  const [gulfNews, setGulfNews] = useState() as any;

  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 10000);
  }, []);
  const loadData = async () => {
    try {
      let category = ` in: ["Gulf-News", "International","Entertainment"]`;
      let allNews: any = await AllNews(category);
      if (allNews.networkStatus == 7) {
        const allNewsData = allNews?.data?.allNews?.data;
        let gulfNewsData: any = [];
        let international: any = [];
        let entertainment: any = [];
        for (let i = 0; i < allNewsData?.length; i++) {
          let item = allNewsData[i]?.attributes?.categories?.data;
          for (let j = 0; j < item?.length; j++) {
            if (item[j]?.attributes?.category === "Gulf-News") {
              gulfNewsData?.push(allNewsData[i]);
            }
            if (item[j]?.attributes?.category === "International") {
              international?.push(allNewsData[i]);
            }
            if (item[j]?.attributes?.category === "Entertainment") {
              entertainment?.push(allNewsData[i]);
            }
          }
        }
        setBusiness(gulfNewsData);
        setGulfNews(international);
        setEntertaimentNews(entertainment);
        setLoading(false);
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
        <Col span={24} className="mb-5">
          <Row>
            <Col xxl={8} lg={7} md={12} sm={12} xs={24}>
              {businessNews?.slice(0, 15).map((item_: any, index: any) => {
                return (
                  <>
                    <NewsItem
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 11 && <Row className="breadcums"></Row>}
                  </>
                );
              })}
            </Col>
            {/* SECOND COLUMN */}
            <Col xxl={8} lg={10} md={12} sm={12} xs={24}>
              {entertainmentNews?.slice(0, 3).map((item_: any, index: any) => {
                return (
                  <>
                    <SecondNewsItems
                      newsData={"businessNews"}
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 2 && <Row className="breadcums"></Row>}
                  </>
                );
              })}
            </Col>
            {/* THIRD COLUMN */}
            <Col xxl={8} lg={7} className="d-none d-lg-block">
              {gulfNews?.slice(0, 11).map((item_: any, index: any) => {
                return (
                  <>
                    <NewsItem newsData={"entertainmentNews"} item={item_} />
                    {index < 10 && <Row className="breadcums"></Row>}
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

export default SixthSection;
