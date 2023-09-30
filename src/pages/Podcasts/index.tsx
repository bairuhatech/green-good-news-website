import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import client from "../../Config/Graphql/apolloclient";
import { gql } from "@apollo/client";
import ListenPodcast from "./components/listenPodcast";
import LoadingBox from "../../components/LoadingBox";
import Header from "../../components/header";
import "./styles.css";

function Podcasts() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
      const handleContextmenu = (e: Event) => {
        e.preventDefault();
      };
    
      document.addEventListener("contextmenu", handleContextmenu);
    
      return () => {
        document.removeEventListener("contextmenu", handleContextmenu);
      };

  }, []);

  const loadData = () => {
    client
      .query({
        query: gql`
          query {
            podcasts(sort: "id:desc") {
              data {
                attributes {
                  title
                  body
                  audio
                  image
                  createdAt
                }
              }
            }
          }
        `,
      })
      .then(function (response: any) {
        if (response.networkStatus === 7) {
          let data = response?.data?.podcasts?.data;
          setDataSource(data);
          setLoading(false);
        }
      })
      .catch((error: any) => console.log(error));
    setLoading(true);
  };

  const PlayPause = (event: any) => {
    const video = event.target;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          <Header />
          <div className="podcast">
            <div className="all-podcasts">
              <div className="space"></div>
              <Row className="g-0">
                <ListenPodcast data={dataSource} />
              </Row>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Podcasts;
