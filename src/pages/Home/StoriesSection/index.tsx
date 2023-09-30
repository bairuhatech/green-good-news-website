import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import "./style.scss";
import LoadingBox from "../../../components/LoadingBox/LoadingBox2";
const StoriesSection = () => {
  const [latestShortsVideo, setLatestShortsVideo] = useState([]);

  const ref = useRef<any>();
  const scroll = (ratio: any) => {
    ref.current.scrollLeft += ratio;
  };
  useEffect(() => {
    setTimeout(() => {
      fetchLatestShortsVideo();
    }, 10000);
  }, []);
  const fetchLatestShortsVideo = async () => {
    try {
      const response = await axios.get(
        "https://youtube.googleapis.com/youtube/v3/search",
        // "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=[search_query]&type=video&videoDuration=short&key=AIzaSyDL68ox3ilBWkTERBYl6k7186QNV5uYfG4",
        {
          params: {
            // key: "AIzaSyDL68ox3ilBWkTERBYl6k7186QNV5uYfG4",
            // key: "AIzaSyDscDGpBphxDt8ph_akTou_Dv1S9aT22Wk",
            // channelId: "UCWoaMw1yKGYlhi4tri7Dm6Q",
            key: "AIzaSyDCUqKhZAc7CcB8U7T9F2eTrXp7EX4dU5k",
            channelId: "UCsPsEKy0BeYpuLW5IGoTDrw",

            order: "date",
            type: "video",
            videoDuration: "short",
            maxResults: 20,
          },
        }
      );
      const videos = response.data.items;
      setLatestShortsVideo(videos);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div className="storiesSection-scrollBox">
          {latestShortsVideo?.length > 4 ? (
            <button
              className="storiesSection-scrollbutton1"
              onClick={() => scroll(-400)}
            >
              <MdOutlineKeyboardArrowLeft color="white" />
            </button>
          ) : null}
          <div className="storiesSection-scroll" ref={ref}>
            {latestShortsVideo?.map((item: any, i) => {
              return (
                <div key={item._id} className="storiesSection-item">
                  <div className="storiesSection-VideoCard">
                    <iframe
                      title="Latest Shorts Video"
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${item.id.videoId}?controls=0&modestbranding=1&showinfo=1`}
                      frameBorder="0"
                      className="rounded-iframe"
                    ></iframe>
                  </div>
                </div>
              );
            })}
          </div>
          {latestShortsVideo?.length > 4 ? (
            <button
              className="storiesSection-scrollbutton2 "
              onClick={() => scroll(400)}
            >
              <MdOutlineKeyboardArrowRight color="white" />
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default StoriesSection;
