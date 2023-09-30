import React from "react";
import { useEffect, useState } from "react";
import { Row, Col } from "antd";
import ButtonPrimary from "../../../components/buttonPrimary";
import { Skeleton } from "antd";
import { navigate } from "gatsby";
import { AllNews } from "../../../../src/utils/api";
import NewsItem from "../../../components/newsItem";
import SecondNewsItems from "../../../components/secondNewsItems";
import ThirdnewsItem from "../../../components/thirdNewsItem";
import NewsItemText from "../../../components/newsItemText";

const FifthSection = () => {
  const [datas, setDatas] = useState() as any;
  const [businessNews, setBusinessNews] = useState() as any;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 9000);
  }, []);
  const loadData = async () => {
    try {
      let category = ` in: ["Business", "Entertainment"]`;
      let allNews: any = await AllNews(category);
      if (allNews.networkStatus == 7) {
        const allNewsData = allNews?.data?.allNews?.data;

        let entertainment: any = [];
        let education: any = [];

        for (let i = 0; i < allNewsData?.length; i++) {
          let item = allNewsData[i]?.attributes?.categories?.data;
          for (let j = 0; j < item.length; j++) {
            if (item[j]?.attributes?.category === "Entertainment") {
              entertainment?.push(allNewsData[i]);
            }
            if (item[j]?.attributes?.category === "Business") {
              education?.push(allNewsData[i]);
            }
          }
        }
        setLoading(false);
        setBusinessNews(entertainment);
        setDatas(education);
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
        <Col span={24} className="mb-5">
          <Row>
            {/* FIRST COLUMN */}
            <Col xxl={8} lg={7} md={12} sm={12} xs={24}>
              <>
                <Col lg={24} style={{ padding: "12px 16px 12px 16px" }}>
                  <img
                    className="newsImage3"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1YLr6X5UocDMJJa2qcZv_X1LMhlmRT4MjbQ&usqp=CAU"
                  />
                </Col>
                <Row className="breadcums "></Row>
              </>
              <ButtonPrimary name={"Science News"} />
              {datas?.slice(0, 18).map((item_: any, index: any) => {
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
            {/* SECOND COLUMN */}
            <Col xxl={8} lg={10} md={12} sm={12} xs={24}>
              {datas?.slice(0, 2).map((item_: any, index: any) => {
                return (
                  <>
                    <SecondNewsItems
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 2 && <Row className="breadcums"></Row>}
                  </>
                );
              })}
              <>
                <Col lg={24} style={{ padding: "12px 16px" }}>
                  <img
                    className="newsImage3"
                    src="https://www.shutterstock.com/image-vector/summer-musthave-products-on-geometric-600w-1096791344.jpg"
                  />
                </Col>
                <Row className="breadcums "></Row>
              </>
              {businessNews?.slice(0, 8).map((item_: any, index: any) => {
                return (
                  <>
                    <ThirdnewsItem
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 7 && <Row className="breadcums"></Row>}
                  </>
                );
              })}
            </Col>
            {/* THIRD COLUMN */}
            <Col xxl={8} lg={7} className="d-none d-lg-block">
              <Col
                lg={24}
                style={{ padding: "12px 16px 12px 16px" }}
                className="d-none d-sm-block"
              >
                <img
                  className="frstSctnCol3Img newsImage3"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTrLUlKekXJwabbuL-3PoeQFrsLrxZfTyyQQ&usqp=CAU"
                />
              </Col>
              <Row className="breadcums "></Row>
              {datas?.slice(0, 17).map((item_: any, index: any) => {
                return (
                  <>
                    <NewsItemText
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 16 && <Row className="breadcums"></Row>}
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

export default FifthSection;
