import React from "react";
import Header from "../../../components/header/index";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import { PiTimerLight } from "react-icons/pi";
import { Row, Col } from "react-bootstrap";
import "../styles.css";
import { Slider } from "antd";


const AllPodcasts = (props: any) => {
  let data = props?.location?.state?.dataSource;

 const adds = [
  {
    image1 : "https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-ncino.jpg"
  },
  {
    image1 : "https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-aws.jpg"
  },
  {
    image1 : "https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-docusign.jpg"
  },
  {
    image1 : "https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-docusign.jpg"
  },
  {
    image1 : "https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-disney2B.jpg"
  },
  {
    image1 : "https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-liberty-mutual.jpg"
  }
 ]

  return (
    <div>
      <Header/>
      <div className="podcastContainer" style={{paddingTop:"20px"}}>
      {/* <div className="podcastContainer"> */}
        <Row>
          <Col md={3}>
            {adds?.map((item:any) => {  
              return(
                <img src={item?.image1} loading={"lazy"} width={"100%"}/>
              )
            })}
          </Col>
          <Col md={6}>
            {data?.map((item: any) => {
              return (
                <div className="all-podcasts">
                  <div className="podcastCardAllpodcasts mt-6"  style={{backgroundColor:"#ffff"}}>
                    <img className="MainImageAllpodcasts" src={item?.attributes?.image} />
                    <div className="textContainer">
                      <div>
                        <span className="span" style={{color:"black"}}>PODCAST</span>
                        <p className="cardHeadAllpodcasts" style={{color:"black"}}>{item?.attributes?.title}</p>
                        <p className="AllpodcastcardBody">{item?.attributes?.body}</p>
                        {/* <Slider
                    min={0}
                    max={0.9999999}
                    onChange={(val: any) => {
                      console.log(val);
                      setValue(val);
                    }}
                    value={value}
                    step={0.00001}
                  /> */}
                        {/* <p className="p" style={{color:"black"}}>
                          <PiTimerLight /> 2 hours and 20 miniuts
                        </p> */}
                      </div>
                      <div className="playbtnContainer">
                        <BiDotsVerticalRounded size={23} />s
                        <div className="">
                          {/* {play ? (
                    <BsPauseCircle
                      size={33}
                        onClick={() => setPlay(!play)}
                      className="podcast-control-icon"
                    />
                     ) : (  */}
                          <BsPlayCircle
                          color="black"
                            size={33}
                            //   onClick={() => setPlay(!play)}
                            className="podcast-control-icon"
                          />
                          {/* )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Col>
          <Col md={3}>
          {adds?.map((item:any) => {
              return(
                <img src={item?.image1} width={"100%"}/>
              )
            })}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AllPodcasts;
