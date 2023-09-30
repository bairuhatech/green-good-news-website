import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import HightlightsAction from "../../components/HighlightsAction";
import "../../styles/global.scss";
import BottomNav from "../../components/BottomNav";
import client from "../../Config/Graphql/apolloclient";
import { gql } from "@apollo/client";

const Index = () => {
  const carouselRef = React.useRef<CarouselRef>(null);
  const [data, setData] = useState([]) as any;
  const [loading, setLoading] = useState<boolean>(true);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    client
      .query({
        query: gql`
          query {
            highlights {
              data {
                id
                attributes {
                  media
                  likes
                }
              }
            }
          }
        `,
      })
      .then(function (response: {
        networkStatus: number;
        data: { highlights: { data: any } };
      }) {
        if (response.networkStatus === 7) {
          const data = response.data.highlights.data;
          setData(data);
          setLoading(false);
        }
      })
      .catch((error: any) =>
        console.log("||== graphql | catch | error ===>", error)
      );
  };

  // const handlePrevClick = () => {
  //   carouselRef.current?.prev();
  // };

  // const handleNextClick = () => {
  //   carouselRef.current?.next();
  // };

  const handleBeforeChange = (oldIndex: number, newIndex: number) => {
    setCurrentImageIndex(newIndex);
  };

  const getBackgroundStyle = (index: number) => {
    if (data[index]?.attributes?.media) {
      return {
        backgroundImage: `url(${data[index].attributes.media})`,
        backgroundSize: "cover",
      };
    }
    return {};
  };
  const handlePrevClick = () => {
    carouselRef.current?.prev();
  };

  const handleNextClick = () => {
    carouselRef.current?.next();
  };

  return (
    <>
      <div
        className="backgroundDiv"
        style={{
          ...getBackgroundStyle(currentImageIndex),
          filter: "blur(7px)",
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -1,
          background: "blur",
        }}
      />
      <div style={{ height: "90vh" }}>
        <div
          className="bottomNav"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            position: "relative",
            marginRight: "13px",

            //  backgroundColor:"yellow"
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontFamily: "Noto Sans",
              fontWeight: 700,
              fontSize: "20px",
              zIndex: 3,
              marginBottom: "15px",
            }}
          >
            HIGHLIGHTS
          </div>
          <div
            className="bottomNav"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
              height: "60vh",
              backgroundImage: "red",
            }}
          >
            <div style={{ width: "90vw", maxWidth: "550px" }}>
              <div
                style={{
                  width: "50%",
                  height: "64%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 3,
                }}
                onClick={handlePrevClick}
              />
              <Carousel
                // id="carousel"
                effect="fade"
                dotPosition="top"
                beforeChange={handleBeforeChange}
                ref={carouselRef}
                style={{
                  alignSelf: "center",
                  position: "relative",
                }}
              >
                {data.map((item: any) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={
                        item &&
                        item.attributes &&
                        item.attributes.media &&
                        item.attributes.media
                      }
                      style={{
                        width: "100%",
                        height: "auto",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <br />
                    <HightlightsAction
                      likes={
                        item &&
                        item.attributes &&
                        item.attributes.likes &&
                        item.attributes.likes
                      } // pass the initial likes count as a prop
                    />
                  </div>
                ))}
              </Carousel>
              <div
                style={{
                  width: "50%",
                  height: "64%",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  zIndex: 3,
                }}
                onClick={handleNextClick}
              />
            </div>
          </div>
        </div>
        <div>
          <BottomNav />
        </div>
      </div>
    </>
  );
};
export default Index;
