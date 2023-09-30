import React, { useEffect, useState } from "react";
import Header from "../../../components/header/index";
import { Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import {
  RiMoneyEuroCircleFill,
  RiMoneyEuroCircleLine,
  RiMentalHealthFill,
  RiMentalHealthLine,
} from "react-icons/ri";
import {
  HiOutlineLightBulb,
  HiUsers,
  HiOutlineUsers,
  HiLightBulb,
} from "react-icons/hi";
import { HiOutlineFaceSmile, HiFaceSmile } from "react-icons/hi2";
import { IoBusinessSharp, IoBusinessOutline } from "react-icons/io5";
import { PiTimerLight, PiShuffleFill } from "react-icons/pi";
import {
  BiDotsVerticalRounded,
  BiSkipPrevious,
  BiSkipNext,
  BiDotsHorizontalRounded,
} from "react-icons/bi";
import {
  BsFillPlayCircleFill,
  BsMusicNoteList,
  BsFillPauseCircleFill,
} from "react-icons/bs";
import { CiBookmark } from "react-icons/ci";
import { FcBookmark } from "react-icons/fc";
import { Slider } from "antd";
import { navigate } from "gatsby";
import { Mainstyle } from "../../../Config/Mainstyle";

function ListenPodcast(props: any) {
  const [play, setPlay] = useState(false);
  const [loop, setLoop] = useState(false);
  const [mute, setMute] = useState(false);
  const [pip, setPip] = useState(false);
  const [volume, setVolume] = useState(0.15);
  const [showVol, setShowVol] = useState(false);
  const [value, setValue] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [activeTab, setactiveTab] = useState(0);
  const [changeBookmark, setchangeBookmark] = useState(true);

  let data = props?.data;
  const [selectedPodcast, setSelectedPodcast] = useState<any>();
  const [played, setPlayed] = useState(0);
  useEffect(() => {
    if (mute) {
      setVolume(0);
    }
  }, [mute, volume]);
  let categoryData = [
    {
      title: "Business",
      icon:
        activeTab === 0 ? (
          <IoBusinessSharp size={25} color="#0055a6" />
        ) : (
          <IoBusinessOutline size={25} color="#0055a6" />
        ),
    },
    {
      title: "Healthy",
      icon:
        activeTab === 1 ? (
          <RiMentalHealthFill size={25} color="#0055a6" />
        ) : (
          <RiMentalHealthLine size={25} color="#0055a6" />
        ),
    },
    {
      title: "Social",
      icon:
        activeTab === 2 ? (
          <HiUsers size={25} color="#0055a6" />
        ) : (
          <HiOutlineUsers size={25} color="#0055a6" />
        ),
    },
    {
      title: "Psychology",
      icon:
        activeTab === 3 ? (
          <HiFaceSmile size={25} color="#0055a6" />
        ) : (
          <HiOutlineFaceSmile size={25} color="#0055a6" />
        ),
    },
    {
      title: "Insights",
      icon:
        activeTab === 4 ? (
          <HiLightBulb size={25} color="#0055a6" />
        ) : (
          <HiOutlineLightBulb size={25} color="#0055a6" />
        ),
    },
    {
      title: "Finantial",
      icon:
        activeTab === 5 ? (
          <RiMoneyEuroCircleFill size={25} color="#0055a6" />
        ) : (
          <RiMoneyEuroCircleLine size={25} color="#0055a6" />
        ),
    },
  ];

  const handleTabSelect = (index: any) => {
    setactiveTab(index);
  };

  const handleDivClick = (selectedObject: any) => {
    setSelectedPodcast(selectedObject);
  };

  const DetailPodcast = (data: any) => {
    navigate("/Podcasts/components/allPodcasts", {
      state: {
        dataSource: data,
      },
    });
  };

  return (
    <div>
      <div className="podcastContainer">
        <div className="DiscoverContainer">
          <Row >
            <h4
              className="AllHeads"
              style={{ marginTop: "20px", marginBottom: "10px" }}
            >
              Discover
            </h4>
            <Col md={8}>
              <Row>
                {categoryData?.map((item: any, index: any) => {
                  return (
                    <div
                      className={`podcastCategory ${
                        activeTab === index ? "activetabs" : ""
                      } `}
                      key={index}
                      onClick={() => handleTabSelect(index)}
                    >
                      <div className="mt-2">{item?.icon}</div>
                      <span className="categoryTitle">{item?.title}</span>
                    </div>
                  );
                })}
              </Row>
              <div className="trendingHeadContainer">
                <h5 className="AllHeads">Trending Podcasts</h5>
                <span
                  className="showAlltxt"
                  onClick={() => DetailPodcast(props?.data)}
                >
                  Show All
                </span>
              </div>
              {data?.slice(0, 2).map((item: any) => {
                return (
                  <div
                    className="podcastCard"
                    onClick={() => handleDivClick(item)}
                    style={{
                      backgroundColor:
                        selectedPodcast === item ? "#f1817b" : "#ffff",
                    }}
                  >
                    <img className="MainImage" src={item?.attributes?.image} />
                    <div className="textContainer">
                      <div>
                        <span
                          className="span"
                          style={{
                            color: selectedPodcast === item ? "#ffff" : "black",
                          }}
                        >
                          PODCAST / Jun  24
                        </span>
                        <p
                          className="cardHead"
                          style={{
                            color: selectedPodcast === item ? "#ffff" : "black",
                          }}
                        >
                          {item?.attributes?.title}
                        </p>
                        <p
                          className="AllpodcastcardBody"
                          style={{
                            color: selectedPodcast === item ? "#ffff" : "black",
                          }}
                        >
                          {item?.attributes?.body}
                        </p>
                        {/* <p
                          className="p"
                          style={{
                            color: selectedPodcast === item ? "#ffff" : "black",
                          }}
                        >
                          <PiTimerLight
                            style={{
                              color:
                                selectedPodcast === item ? "#ffff" : "black",
                            }}
                          />{" "}
                          2 hours and 20 miniuts
                        </p> */}
                      </div>
                      <div className="playbtnContainer">
                        <BiDotsVerticalRounded
                          size={23}
                          style={{
                            color: selectedPodcast === item ? "#ffff" : "black",
                          }}
                        />
                        <div className="">
                          {selectedPodcast === item && play ? (
                            <BsPauseCircle
                              size={33}
                              onClick={() => setPlay(!play)}
                              className="podcast-control-icon"
                              style={{
                                color:
                                  selectedPodcast === item ? "#ffff" : "black",
                              }}
                            />
                          ) : (
                            <BsPlayCircle
                              size={33}
                              onClick={() => setPlay(!play)}
                              className="podcast-control-icon"
                              style={{
                                color:
                                  selectedPodcast === item ? "#ffff" : "black",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Col>

            <Col md={4}>
              <div className="newscontainer">
                <ReactPlayer
                  url={
                    selectedPodcast
                      ? selectedPodcast?.attributes?.audio
                      : props &&
                        props?.data &&
                        props?.data[0]?.attributes?.audio
                  }
                  width="0%"
                  height="0%"
                  playing={play}
                  loop={loop}
                  playsinline={true}
                  muted={mute}
                  volume={volume}
                  onProgress={(val: any) => {
                    setValue(val?.played);
                  }}
                />
                <div className="audioPlayer">
                  <div className="audioPlayerHeader">
                    <img
                      className="audioPlayerImage"
                      src={
                        selectedPodcast
                          ? selectedPodcast?.attributes?.image
                          : props &&
                            props?.data &&
                            props?.data[0]?.attributes?.image
                      }
                    />
                    <div className="audioPlayerTitle">
                      {selectedPodcast
                        ? selectedPodcast?.attributes?.title
                        : props &&
                          props?.data &&
                          props?.data[0]?.attributes?.title}
                    </div>
                    {changeBookmark ? (
                      <CiBookmark
                        size={20}
                        cursor={"pointer"}
                        onClick={() => setchangeBookmark(!changeBookmark)}
                      />
                    ) : (
                      <FcBookmark
                        size={20}
                        cursor={"pointer"}
                        onClick={() => setchangeBookmark(!changeBookmark)}
                      />
                    )}
                  </div>
                  <div className="scrollableTxt">
                    {selectedPodcast
                      ? selectedPodcast?.attributes?.body
                      : props &&
                        props?.data &&
                        props?.data[0]?.attributes?.body}
                  </div>
                  <Slider
                    min={0}
                    max={0.9999999}
                    onChange={(val: any) => {
                      setValue(val);
                    }}
                    value={value}
                    step={0.00001}
                  />
                  <div className="card__wrapper2">
                    <div className="card__time card__time-passed">03:34</div>
                    <div className="card__time card__time-left">02:04</div>
                  </div>
                  <div></div>
                  <div className="card__wrapper">
                    <BsMusicNoteList size={18} />
                    <BiSkipPrevious size={28} />
                    <div className="" style={{cursor:"pointer"}}>
                      {play ? (
                        <BsFillPauseCircleFill
                          size={50}
                          onClick={() => setPlay(!play)}
                        />
                      ) : (
                        <BsFillPlayCircleFill
                          size={50}
                          onClick={() => setPlay(!play)}
                        />
                      )}
                    </div>
                    <BiSkipNext color="black" size={28} />
                    <PiShuffleFill size={19} color="black" />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <h5 className="AllHeads btmHead">Best Podcasts</h5>

          <Row>
            {data?.slice(0, 3).map((item: any) => {
              return (
                <Col md={4}>
                  <div className="bottomCardMainContainer">
                    <div className="bottomCard">
                      <img
                        className="bottomCardImage"
                        src={item?.attributes?.image}
                      />
                      <a className="bottomCardInner">
                        <p>{item?.attributes?.title}</p>
                        <p className="small">{item?.attributes?.body}</p>
                        <div className="go-corner">
                          <BiDotsHorizontalRounded
                            style={{ marginLeft: "12px" }}
                          />
                        </div>
                      </a>
                    </div>
                    <div className="bottomCardPlayBtn">
                      <span className="p">
                        <PiTimerLight /> 2 hours and 20 miniuts
                      </span>
                      <BsFillPlayCircleFill size={30} />
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ListenPodcast;
