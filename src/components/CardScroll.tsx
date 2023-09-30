import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Mainstyle } from "../Config/Mainstyle";
import client from "../Config/Graphql/apolloclient";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { Link, navigate } from "gatsby";
import { Row } from "antd";
import { API } from "../Config/API";
import axios from "axios";
import { BannerImage } from "../utils/api";
import LoadingBox from "./LoadingBox";

export default function SimpleSlider() {
  const [datas, setDatas] = useState([]) as any;
  const [loading, setLoading] = useState(true);

  // const loadData = () => {
  //   client
  //     .query({
  //       query: gql`
  //         query {
  //           exclusives {
  //             data {npm r
  //               attributes {
  //                 image
  //                 head
  //                 body
  //                 createdAt
  //               }
  //             }
  //           }
  //           businessNews {
  //             data {
  //               attributes {
  //                 image
  //                 head
  //                 body
  //                 createdAt
  //               }
  //             }
  //           }
  //         }
  //       `,
  //     })
  //     .then(function (response: any) {
  //       if (response.networkStatus == 7) {
  //         let data = response.data.exclusives.data;
  //         let businessNewsData = response.data.businessNews.data;

  //         setDatas(data);
  //         setBusinessNews(businessNewsData);
  //         setLoading(false);
  //       }
  //     })
  //     .catch((error: any) => console.log("=====FIFTHSECTION======>", error));
  // };
  // const handleClick = (item: any) => {
  //   navigate("/Home/DetailedNews", {
  //     state: {
  //       item,
  //     },
  //   });
  // };

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 3000,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 3000,
  //   arrows: false,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //         infinite: true,
  //         dots: false,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         dots: false,
  //       },
  //     },
  //   ],
  // };
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    try {
      let response: any = await BannerImage();
      setDatas(response.data.banners.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <main className="Container">
          <div className="ContentSection">
            <div style={{ marginTop: 10 }}>
              {datas?.map((item: any) => (
                <div className="cardScroll-bannerdiv" key={item.id}>
                  <img
                    className="cardScroll-bannerImg"
                    src={item?.attributes?.banner_image}
                    alt="slider"
                  />
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </>

    /* <Slider {...settings}>
          {datas.slice(0, 8).map((item_: any, index: any) => (
            <div
              style={{ borderRadius: "8px" }}
              onClick={() => {
                handleClick(item_);
              }}
            >
              <div
                className="cardMain mt-1 mb-2"
                style={{ padding: "10px", cursor: "pointer" }}
              >
                <div className="cardImage">
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                    src={
                      item_ &&
                      item_.attributes &&
                      item_.attributes.image &&
                      item_.attributes.image
                    }
                  />
                </div>
                <div className="cardText">
                  <p
                    style={{
                      ...Mainstyle.middleTxt,
                      lineHeight: "1.5",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                    }}
                  >
                    {item_ &&
                      item_.attributes &&
                      item_.attributes.head &&
                      item_.attributes.head}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider> */
  );
}
