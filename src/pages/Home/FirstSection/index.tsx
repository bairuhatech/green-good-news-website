import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import { Col, Row } from "antd";
import { AllNews, GetHighPriority, GetSecondLeads } from "../../../../src/utils/api";
import ButtonPrimary from "../../../components/buttonPrimary";
import { navigate } from "gatsby";
import NewsItem from "../../../components/newsItem";
import SecondNewsItems from "../../../components/secondNewsItems";
import ThirdnewsItem from "../../../components/thirdNewsItem";
import WhatsAppIcon from "../../../components/whatsAppIcon";
import PollingCard from "../../../components/pollingCard";
const FirstSection = (props: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>();
  const [category1, setCategory1] = useState() as any;
  const [category2, setCategory2] = useState() as any;
  const [category3, setCategory3] = useState() as any;
  const [categoryLocal, setCategoryLocal] = useState(
    '["Exclusive", "Business", "Top"]'
  ) as any;
  const [highPriority, sethighPriority] = useState() as any;
  const [secondLeads, setSecondLeads] = useState() as any;

  let cat =
    typeof window !== "undefined" && window.localStorage.getItem("setCategory")
      ? typeof window !== "undefined" &&
        window.localStorage.getItem("setCategory")
      : `["Exlusive", "Business", "Top"]`;

  useEffect(() => {
    loadData();
    setCategoryLocal(cat);
    HighPriority();
    SecondLeads()
  }, [cat, categoryLocal]);

  const loadData = async () => {
    setLoading(true);
    try {
      let category = `in : ${categoryLocal}`;
      let allNews: any = await AllNews(category);
      if (allNews.networkStatus == 7) {
        let data = allNews.data.allNews.data;
        let categoryOne: any = [];
        let categoryTwo: any = [];
        let categoryThree: any = [];
        data.length &&
          data.map((item: any, index: any) => {
            let itemData = item.attributes.categories.data;
            if (category === `["Exclusive", "Business", "Top"]`) {
              itemData.map((item2: any, index2: any) => {
                if (item2.attributes?.category === "Exclusive") {
                  categoryOne.push(item);
                }
                if (item2.attributes?.category === "Business") {
                  categoryTwo.push(item);
                }
                if (item2.attributes?.category === "Top") {
                  categoryThree.push(item);
                }
              });
            } else {
              //
              const arrayLength = data.length;
              const partSize = Math.ceil(arrayLength / 3);
              let startIndex = 0;
              for (let i = 0; i < 3; i++) {
                const endIndex = startIndex + partSize;
                const part = data.slice(startIndex, endIndex);
                if (i === 0) {
                  categoryOne.push(...part);
                } else if (i === 1) {
                  categoryTwo.push(...part);
                } else {
                  categoryThree.push(...part);
                }
                startIndex = endIndex;
              }
            }
            setCategory1(categoryOne);
            setCategory2(categoryTwo);
            setCategory3(categoryThree);
            setLoading(false);
          });
        setData(data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const HighPriority = async () => {
    setLoading(true);
    try {
      let highPriority: any = await GetHighPriority();
      if (highPriority.networkStatus == 7) {
        let data = highPriority.data.allNews.data;
        let highPriorityArry: any = [];
        data.length &&
          data.map((item: any, index: any) => {
            highPriorityArry.push(item);
            sethighPriority(highPriorityArry);
            setLoading(false);
          });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const SecondLeads = async () => {
    setLoading(true);
    try {
      let secondLeads: any = await GetSecondLeads();
      if (secondLeads.networkStatus == 7) {
        let data = secondLeads.data.allNews.data;
        let secondLeadsArry: any = [];
        data.length &&
          data.map((item: any, index: any) => {
            secondLeadsArry.push(item);
            setSecondLeads(secondLeadsArry);
            setLoading(false);
          });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
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
      },
    });
  };
  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <Col span={24}>
          <Row>
            {/* FIRST COLUMN */}
            <Col xxl={8} lg={7} className="d-none d-lg-block ">
              {secondLeads?.slice(0, 1).map((item_: any) => {
                return (
                  <>
                    <NewsItem
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    <Row className="breadcums"></Row>
                  </>
                );
              })}
              <>
                <Col lg={24} style={{ padding: "12px 16px 12px 16px" }}>
                  <Col>
                    <img
                      className="newsImage"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1YLr6X5UocDMJJa2qcZv_X1LMhlmRT4MjbQ&usqp=CAU"
                    />
                  </Col>
                </Col>
                <Row className="breadcums "></Row>
              </>
              <ButtonPrimary name={"Exclusive News"} />
              {category2?.slice(0, 12).map((item_: any, index: number) => {
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
              {highPriority?.length
                ? highPriority?.slice(0, 1).map((item_: any, index: number) => {
                    return (
                      <>
                        <SecondNewsItems
                          item={item_}
                          onClick={(val: any) => handleClick(val, item_.id)}
                        />
                        {index < 11 && <Row className="breadcums"></Row>}
                      </>
                    );
                  })
                : category1?.slice(0, 1).map((item_: any, index: number) => {
                    return (
                      <>
                        <SecondNewsItems
                          item={item_}
                          onClick={(val: any) => handleClick(val, item_.id)}
                        />
                      </>
                    );
                  })}
              {/* SECOND ROW SECTION OF SECOND COLUMN */}
              <>
                <Col md="24">
                  <div style={{ padding: "12px 16px" }}>
                    <img
                      className="newsImage"
                      src="https://www.shutterstock.com/image-vector/summer-musthave-products-on-geometric-600w-1096791344.jpg"
                      alt=""
                    />
                  </div>
                </Col>
                <Row className="breadcums "></Row>
              </>
              {/* THIRD ROW SECTION OF SECOND COLUM */}

              {category2?.slice(0, 7).map((item_: any, index: number) => {
                return (
                  <>
                    <ThirdnewsItem
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 6 && <Row className="breadcums"></Row>}
                  </>
                );
              })}
              <Col md="24" className="advertisementCol4 d-sm-none d-block">
                <img
                  className="newsImage2"
                  src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2021/01/16/950225-amazon-fire-tv-edition-smart-tvs.jpg "
                  alt=""
                />
              </Col>
            </Col>
            {/* THIRD COLUMN */}
            <Col xxl={8} lg={7} md={12} sm={12} xs={24}>
              {category2?.slice(0, 1).map((item_: any, index: number) => {
                return (
                  <>
                    <NewsItem
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    <Row className="breadcums"></Row>
                  </>
                );
              })}
              {/* ADVERTISEMENT CARD */}
              <>
                <Col
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  style={{ padding: "12px 16px 12px 16px" }}
                  className="d-none d-sm-block"
                >
                  <img
                    className="newsImage"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTrLUlKekXJwabbuL-3PoeQFrsLrxZfTyyQQ&usqp=CAU"
                  />
                </Col>
                <Row className="breadcums"></Row>
              </>
              <>
                <PollingCard />
              </>
              {category3?.slice(0, 9).map((item_: any, index: number) => {
                return (
                  <>
                    <NewsItem
                      item={item_}
                      onClick={(val: any) => handleClick(val, item_.id)}
                    />
                    {index < 8 && <Row className="breadcums"></Row>}
                  </>
                );
              })}
            </Col>
          </Row>
        </Col>
      )}
      <Row className="firstSection-UtbeBrder"></Row>
      <WhatsAppIcon />
    </>
  );
};

export default FirstSection;
