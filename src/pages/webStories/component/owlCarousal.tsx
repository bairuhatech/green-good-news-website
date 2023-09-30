import React, { useState } from "react";
import { Carousel } from "antd";
import "../style.css";
import type { CarouselRef } from "antd/es/carousel";
import { HiMiniArrowRightCircle } from "react-icons/hi2";
import { HiMiniArrowLeftCircle } from "react-icons/hi2";

function OwlCarousal(props: any) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const carouselRef = React.useRef<CarouselRef>(null);
  const data =
    props &&
    props?.location &&
    props?.location?.state &&
    props?.location?.state?.item;

  const handleBeforeChange = (oldIndex: number, newIndex: number) => {
    setCurrentImageIndex(newIndex);
  };

  const getBackgroundStyle = (index: number) => {
    if (data?.length && data[index]?.imageUrl) {
      return {
        backgroundImage: `url(${data?.length && data[index]?.imageUrl})`,
        backgroundSize: "cover",
      };
    }
    return {};
  };
  const handlePrevClick = () => {
    carouselRef?.current?.prev();
  };

  const handleNextClick = () => {
    carouselRef?.current?.next();
  };

  return (
    <>
      <div
        className="owlCarousal-backgroundDiv"
        style={{
          ...getBackgroundStyle(currentImageIndex),
        }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ height: "100vh", width: 380, background: "" }}>
          <div className="owlCarousal-bottomNav">
            <div>
              <HiMiniArrowLeftCircle
                size={50}
                color="white"
                className="owl-Carouasl-Image1"
                onClick={handlePrevClick}
              />
            </div>
            <div>
              <HiMiniArrowRightCircle
                size={50}
                color="white"
                className="owl-Carouasl-Image2"
                onClick={handleNextClick}
              />
            </div>

            <Carousel
              dotPosition="top"
              beforeChange={handleBeforeChange}
              ref={carouselRef}
            >
              {data?.length &&
                data?.map((item: any, index: any) => {
                  return (
                    <div key={index}>
                      <div className="owlCarousal-card">
                        <img
                          src={item?.imageUrl}
                          className="owlCaroual-imageCard"
                        />
                        <p className="owlCuarousal-title">{item?.title}</p>
                      </div>
                    </div>
                  );
                })}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

export default OwlCarousal;
