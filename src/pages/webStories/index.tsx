import React, { useEffect, useRef, useState } from "react";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { navigate } from "gatsby";
import "./style.css";
import { API } from "../../Config/API";
import { GET } from "../../utils/api";

function WebStories() {
  const ref = useRef<any>();
  const [data, setData] = useState([]) as any;
  const scroll = (ratio: any) => {
    ref.current.scrollLeft += ratio;
  };
  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 6000);
  }, []);
  const loadData = async () => {
    let uri = API.WEBSTORIES;
    const response: any = await GET(uri);
    setData(response.data);
  };
  const handleClick = (item: any) => {
    navigate("/webStories/component/owlCarousal", {
      state: {
        item,
      },
    });
  };

  return (
    <div className="webStories-main">
      <div className="webStories-HeadTxt">Web Stories</div>
      <div className="webStories-breadcums "></div>
      <br />
      <div style={{ width: "99%" }}>
        <div className="webStories-scrollBox">
          {data?.length > 4 ? (
            <button
              className="webStories-scrollbutton1"
              onClick={() => scroll(-400)}
            >
              <MdOutlineKeyboardArrowLeft color="white" />
            </button>
          ) : null}
          <div className="webStories-scroll" ref={ref}>
            {data?.map((item: any) => {
              return (
                <div className="webStories-ImgDiv">
                  <img
                    onClick={() => handleClick(item?.attributes?.imageList)}
                    className="webStories-image"
                    src={item?.attributes?.image}
                    alt=""
                  ></img>
                  <p className="webStories-description">
                    {item?.attributes?.description}
                  </p>
                </div>
              );
            })}
          </div>
          {data?.length > 4 ? (
            <button
              className="webStories-scrollbutton2 "
              onClick={() => scroll(400)}
            >
              <MdOutlineKeyboardArrowRight color="white" />
            </button>
          ) : null}
        </div>
      </div>
      <br />
      <div className="webStories-breadcums "></div>
    </div>
  );
}

export default WebStories;
