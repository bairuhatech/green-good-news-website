import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import { GetNewsDetails } from "../../../utils/api";
import DetailedFirst from "../DetailedFirst/DetailedFirst";
import DetailedSecond from "../DetailedSecond/DetailedSecond";
import Header from "../../../components/header";
import LoadingBox from "../../../components/LoadingBox/LoadingBox2";
import ShareModal from "../../../components/shareModal";

const DetailedNews = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const search = props.location.search;
  const id = parseInt(search.split("=")[1]);
  const like = props?.location?.state?.item?.attributes?.likes;

  useEffect(() => {
    loadData(id);
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
    const handleContextmenu = (e: Event) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextmenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, [props?.location?.search]);

  const loadData = async (_id: any) => {
    let response: any = await GetNewsDetails(id);
    let data = response?.data?.allNews?.data[0]?.attributes;
    setData(data);
  };

  return (
    <>
      {isLoading ? (
        <LoadingBox />
      ) : (
        <>
          <Header />
          <DetailedFirst datas={data} id={id} like={like} />
        </>
      )}
      {isModalVisible ? (
        <ShareModal
          open={isModalVisible}
          id={props.id}
          desc={props?.datas?.head}
          onCancel={() => setIsModalVisible(false)}
          closable={false}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default DetailedNews;
