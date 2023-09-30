import React, { useState, useRef, useEffect } from "react";
import BottomNav from "../../components/BottomNav";
import ReelsActions from "../../components/reelsActions";
import { animated, useSprings } from "react-spring";
import { FaHeart } from "react-icons/fa";
import { Mainstyle } from "../../Config/Mainstyle";
import client from "../../Config/Graphql/apolloclient";
import { gql } from "@apollo/client";

const Reels = () => {
  const [dataSource, setDataSource] = useState([]);
  const [videoRefs, setVideoRefs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHeartBlink, setShowHeartBlink] = useState(false);
  const scrollingRef = useRef(false);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    client
      .query({
        query: gql`
          query {
            reels {
              data {
                attributes {
                  video
                  title
                  head
                  description
                }
              }
            }
          }
        `,
      })
      .then(function (response:any) {
        if (response.networkStatus === 7) {
          let data = response.data.reels.data;
          const refs = data.map(() => React.createRef());
          setDataSource(data);
          setVideoRefs(refs);
        }
      })
      .catch((error:any) => console.log(error));
  };

  const PlayPause = (event:any) => {
    const video = event.target;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  useEffect(() => {
    videoRefs.forEach((ref:any, index) => {
      if (ref.current) {
        if (index === currentIndex) {
          ref.current.play();
        } else {
          ref.current.pause();
        }
      }
    });
  }, [currentIndex, videoRefs]);

  const springs = useSprings(
    dataSource.length,
    dataSource.map((_, index) => ({
      transform: `translate3d(0,${(index - currentIndex) * 100}%,0)`,
    }))
  );

  const handleWheel = (event:any) => {
    if (scrollingRef.current) {
      return;
    }

    if (event.deltaY > 0 && currentIndex < dataSource.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (event.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }

    scrollingRef.current = true;

    setTimeout(() => {
      scrollingRef.current = false;
    }, 600);
  };

  const handleTouchStart = (event:any) => {
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event:any) => {
    touchEndY.current = event.changedTouches[0].clientY;
    handleSwipe();
  };

  const handleSwipe = () => {
    const touchDiff = touchStartY.current - touchEndY.current;

    if (touchDiff > 0 && currentIndex < dataSource.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (touchDiff < 0 && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const doubleTapHandler = () => {
    setShowHeartBlink(true);
    setTimeout(() => setShowHeartBlink(false), 1000); // Hide the heart blink after 1 second
  };

  if (dataSource.length === 0) {
    return null; // or return a loading indicator
  }

  return (
    <>
      <main
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ height: "80%" }}
      >
        {springs.map(({ transform }, index) => {
          const item:any = dataSource[index];
          return (
            <animated.div
              key={item.attributes.head}
              className="reel-container"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                transform,
              }}
            >
              <div className="reel-thumb">
                <video
                  ref={videoRefs[index]}
                  src={item.attributes.video}
                  autoPlay
                  loop
                  onClick={PlayPause}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                {showHeartBlink && (
                  <div className="heart-blink">
                    <FaHeart size={80} color="red" />
                  </div>
                )}
                <ReelsActions
                  id={index}
                  initialLikes={10}
                  // initialComments={5}
                  initialShares={2}
                />
                <div className="overlay-description">
                  <div style={{ ...Mainstyle.title, marginLeft: "12px" }}>
                    {item.attributes.title}
                  </div>
                  <div
                    className="reel-description"
                    style={{
                      columns: "200px",
                      marginLeft: "15px",
                      marginBottom: "20px",
                    }}
                  >
                    {item.attributes.description}
                  </div>
                </div>
              </div>
            </animated.div>
          );
        })}
      </main>
      <div>
        <BottomNav />
      </div>
    </>
  );
};

export default Reels;
