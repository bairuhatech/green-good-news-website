import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, message } from "antd";
import { CiCircleAlert } from "react-icons/ci";
import { gql } from "@apollo/client";
import client from "../../../Config/Graphql/apolloclient";
import { Mainstyle } from "../../../Config/Mainstyle";
import ButtonPrimary from "../../../components/buttonPrimary";
import BreadCrumbs from "../../../components/BreadCrumbs";
import Advertisement from "../Advertisement/Advertisement";
import { Button, Input, Modal } from "antd";
import moment from "moment";
import { navigate } from "gatsby";
import NewsItem from "../../../components/newsItem";
import NewsItemText from "../../../components/newsItemText";
import SecondNewsItems from "../../../components/secondNewsItems";
import ShareModal from "../../../components/shareModal";
import { API } from "../../../Config/API";
import { POST, PUT, GET } from "../../../utils/api";
import PostActions from "../../../components/postActions";
import ActionModal from "../../../components/actionModal";
import CommentBox from "../../../components/commentBox/";
import CommentItem from "../../../components/commentBox/commentItem";
import { AiOutlineSound } from "react-icons/ai";
import SEO from "../../../components/SEO";
import LoadingBox from "../../../components/LoadingBox/LoadingBox2";
import ShareSocial from "../../../components/shareSocial";

const DetailedFirst = (props: any) => {
  const user =
    typeof window !== "undefined" &&
    window.JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState() as any;
  const [loading, setLoading] = useState<boolean>(true);
  const [featureNews, setFeatureNews] = useState() as any;
  const [techNews, setTechNews] = useState() as any;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [signInModal, setSignInModal] = useState(false);
  const [comment, setComment] = useState() as any;
  const [commentArray, setCommentArray] = useState([]) as any;
  const [audiorecordings, setAudiorecordings] = useState(false);
  const [category, setCategory] = useState(
    props?.datas?.categories?.data[0]?.attributes?.category
  ) as any;
  const [tags, setTags] = useState(props?.datas?.tags?.data) as any;

  useEffect(() => {
    loadData();
    loadComments();
    loadShareNews();
  }, []);

  const loadData = async () => {
    const dataQuery = `query {
			allNews(
			  filters: { categories: {category: {eq: "Exclusive"}}}
			  sort: "id:desc"
			  pagination:{page:1,pageSize:8}
			) {
			  data {
				id
				attributes {
				  head
				  title
				  body
				  image
				  createdAt
          audio
          likes
          permalink
				}
			  }
			}
		  }`;

    const dataQuery2 = `query {
			allNews(
			  filters: { categories: {category: {eq: "Top"}}}
			  sort: "id:desc"
			  pagination:{page:1,pageSize:8}
			) {
			  data {
				id
				attributes {
				  head
				  title
				  body
				  image
				  createdAt
          audio
          likes
          permalink
				}
			  }
			}
		  }`;

    const dataQuery3 = `query {
			allNews(
			  filters: { categories: {category: {eq: "sports"}}}
			  sort: "id:desc"
			  pagination:{page:1,pageSize:8}
			) {
			  data {
				id
				attributes {
				  head
				  title
				  body
				  image
				  createdAt
          audio
          likes
          permalink
				}
			  }
			}
		  }`;

    try {
      const response = await client.query({
        query: gql`
          ${dataQuery}
        `,
      });

      const response2 = await client.query({
        query: gql`
          ${dataQuery2}
        `,
      });
      const response3 = await client.query({
        query: gql`
          ${dataQuery3}
        `,
      });

      if (response.networkStatus === 7) {
        const data = response.data.allNews.data;

        setData(data);
        setLoading(false);
      }
      if (response2.networkStatus === 7) {
        let techNewses = response2.data.allNews.data;
        setTechNews(techNewses);
      }
      if (response3.networkStatus === 7) {
        let featuredNewsData = response3.data.allNews.data;
        setFeatureNews(featuredNewsData);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const loadComments = async () => {
    let url = `${API.COMMENT}?&filters[news_id][id][$eq]=${props.id}`;
    const response: any = await GET(url);
    // console.log(response.data);
    setCommentArray(response.data);
  };

  const handleClick = (item: any, id: any) => {
    let permalink = "";
    if (item && item?.attributes && item?.attributes?.permalink) {
      permalink = item?.attributes?.permalink;
    }
    navigate(`/Home/DetailedNews?id=${id}/${permalink}`, {
      state: {
        item,
        // id,
      },
    });
  };

  const handleLike = async (id: any) => {
    let url = API.ADD_LIKE + props.id;
    const response: any = await PUT(url, {});
    console.log("====response==like===>>>", response);
  };

  const addComment = async () => {
    if (user && user.id) {
      let requestObj = {
        data: {
          comment: comment,
          news_id: props.id,
          user: user.username,
        },
      };

      let url = API.COMMENT;
      const response: any = await POST(url, requestObj);
      if (response.data) {
        message.success("success");
        loadComments();
        setComment("");
      }
    } else {
      navigate("/loginscreen");
    }
  };
  // const formattedDate = props?.datas?.createdAt
  //   ? moment(props.datas.createdAt).format("MMMM Do, h:mm a")
  //   : null;
  const formattedDate = props?.datas?.createdAt
    ? moment(props.datas.createdAt).format("MMMM Do, dddd, h:mm a")
    : null;

  const loadShareNews = async () => {
    const dataQuery4 = `query {
    allNews(
      filters: { categories: {category: {eq: "Exclusive"}}}
    ) {
      data {
      id
      attributes {
        head
        title
        body
        image
        createdAt
        audio
        permalink
      }
      }
    }
    }`;
    try {
      const response4 = await client.query({
        query: gql`
          ${dataQuery4}
        `,
      });
      if (response4.networkStatus === 7) {
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          <SEO
            title={props?.datas?.head}
            description={props?.datas?.body?.slice(0, 100)}
            image={props?.datas?.image}
          />
          <main className="Container">
            <div className="ContentSection">
              <>
                <Row className="detailedNewshead">
                  <Col
                    xl={16}
                    lg={16}
                    md={24}
                    sm={24}
                    style={{ padding: "12px" }}
                  >
                    <BreadCrumbs
                      category={
                        props?.datas?.categories?.data[0]?.attributes?.category
                      }
                    />
                    <div className="tagContainer">
                      {props?.datas?.tags?.data &&
                      props?.datas?.tags?.data.length
                        ? props?.datas?.tags?.data.map((item: any) => {
                            return (
                              <Button className="tags">
                                {item?.attributes?.name?.toUpperCase()}
                              </Button>
                            );
                          })
                        : ""}
                    </div>
                    {props?.datas.head ? (
                      <div style={{ marginTop: 20 }}>
                        <p style={Mainstyle.SubHeads} className="headDetailed">
                          {props?.datas?.head}
                        </p>
                      </div>
                    ) : null}
                    {props?.datas?.title ? (
                      <div style={{ marginTop: 20 }}>
                        <p
                          className="subHeadDetailed"
                          dangerouslySetInnerHTML={{
                            __html: props?.datas?.title,
                          }}
                        ></p>
                      </div>
                    ) : null}

                    <div className="Dateandshare" style={Mainstyle.lighttext}>
                      <div>{formattedDate}</div>
                      <ShareSocial data={props} />
                    </div>

                    {props?.datas?.author_name ? (
                      <div style={Mainstyle.middleTxt}>
                        {props?.datas?.author_name}
                      </div>
                    ) : null}
                    <div style={{ marginTop: 10 }}>
                      <img
                        className="Detailedmain"
                        src={props?.datas?.image}
                        alt="No Image"
                      />
                    </div>
                    {props?.datas?.image1_description ? (
                      <p className="detailedNews-DscptnTxt">
                        {props?.datas?.image1_description}
                      </p>
                    ) : null}
                    <div style={{ marginTop: 15 }}>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: props?.datas?.body,
                        }}
                      ></p>
                    </div>
                    {props?.datas?.image2 ? (
                      <div style={{ marginTop: 10 }}>
                        <img
                          className="Detailedmain"
                          src={props?.datas?.image2}
                          alt="No Image"
                        />
                      </div>
                    ) : null}
                    {props?.datas?.image2_description ? (
                      <div style={{ marginTop: 10 }}>
                        <p className="detailedNews-DscptnTxt">
                          {props?.datas?.image2_description}
                        </p>
                      </div>
                    ) : null}
                    {props?.datas?.audio && !audiorecordings ? (
                      <AiOutlineSound
                        size={20}
                        onClick={() => setAudiorecordings(true)}
                      />
                    ) : null}
                    {audiorecordings ? (
                      <audio controls style={{ width: "100%" }}>
                        <source src={props?.datas?.audio} type="audio/mpeg" />
                      </audio>
                    ) : null}

                    <PostActions
                      data={props}
                      datas={props?.datas}
                      setIsModalVisible={() => setIsModalVisible(true)}
                    />
                    <CommentBox
                      user={user}
                      comment={comment}
                      setComment={(val: any) => setComment(val)}
                      addComment={() => addComment()}
                    />
                    <br />
                    {commentArray && commentArray.length
                      ? commentArray?.slice(0, 3).map((item: any) => {
                          return <CommentItem item={item} />;
                        })
                      : null}

                    <br />
                    <br />
                    <ButtonPrimary name={"Related News"} />
                    <br />
                    <Row>
                      <Advertisement
                        width={"100%"}
                        adsTilte={
                          " https://s01.sgp1.digitaloceanspaces.com/large/868650-43870-qczporqhod-1476987508.jpg"
                        }
                      />
                      <Col
                        xxl={12}
                        lg={12}
                        md={12}
                        sm={24}
                        xs={24}
                        style={{ padding: "12px" }}
                        className="detailedNewsRltd"
                      >
                        {data?.slice(0, 8).map((item: any) => {
                          return (
                            <>
                              <NewsItem
                                item={item}
                                onClick={(val: any) =>
                                  handleClick(val, item?.id)
                                }
                              />
                              <Row className="breadcums"></Row>
                            </>
                          );
                        })}

                        {featureNews?.slice(0, 8).map((item: any) => {
                          return (
                            <>
                              <NewsItemText
                                item={item}
                                onClick={(val: any) =>
                                  handleClick(val, item.id)
                                }
                              />
                              <Row className="breadcums"></Row>
                            </>
                          );
                        })}
                      </Col>
                      <Col
                        xxl={12}
                        lg={12}
                        md={12}
                        sm={24}
                        xs={24}
                        className="detailedNewsRltd"
                        style={{ padding: "12px" }}
                      >
                        {techNews?.slice(0, 5).map((item: any) => {
                          return (
                            <>
                              <SecondNewsItems
                                item={item}
                                onClick={(val: any) =>
                                  handleClick(val, item.id)
                                }
                              />
                              <Row className="breadcums"></Row>
                            </>
                          );
                        })}
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    xl={8}
                    lg={8}
                    className="d-sm-none d-lg-block"
                    style={{ padding: "12px" }}
                  >
                    {data?.slice(0, 3).map((item: any) => {
                      return (
                        <>
                          <NewsItem
                            item={item}
                            onClick={(val: any) => handleClick(val, item.id)}
                          />
                          <Row className="breadcums"></Row>
                        </>
                      );
                    })}
                    <>
                      <Col lg={24} style={{ padding: "12px 16px 12px 16px" }}>
                        <img
                          className="newsImage3"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1YLr6X5UocDMJJa2qcZv_X1LMhlmRT4MjbQ&usqp=CAU"
                        />
                      </Col>
                      <Row className="breadcums "></Row>
                    </>
                    <ButtonPrimary name={"Exclusive News"} />
                    {featureNews?.slice(0, 10).map((item: any) => {
                      return (
                        <>
                          <NewsItem
                            item={item}
                            onClick={(val: any) => handleClick(val, item.id)}
                          />
                          <Row className="breadcums"></Row>
                        </>
                      );
                    })}
                    {data?.slice(0, 8).map((item: any) => {
                      return (
                        <>
                          <NewsItemText
                            item={item}
                            onClick={(val: any) => handleClick(val, item.id)}
                          />
                          <Row className="breadcums"></Row>
                        </>
                      );
                    })}

                    <ButtonPrimary name={"Tech News"} />
                    {techNews?.slice(0, 8).map((item: any) => {
                      return (
                        <>
                          <NewsItem
                            item={item}
                            onClick={(val: any) => handleClick(val, item.id)}
                          />
                          <Row className="breadcums"></Row>
                        </>
                      );
                    })}
                    {data?.slice(0, 10).map((item: any) => {
                      return (
                        <>
                          <NewsItemText
                            item={item}
                            onClick={(val: any) => handleClick(val, item.id)}
                          />
                          <Row className="breadcums"></Row>
                        </>
                      );
                    })}
                  </Col>
                </Row>
                {isModalVisible && props.id ? (
                  <ShareModal
                    open={isModalVisible}
                    id={props?.id}
                    desc={props?.datas?.head}
                    onCancel={() => setIsModalVisible(false)}
                    closable={false}
                  />
                ) : null}
                {signInModal ? (
                  <ActionModal
                    open={signInModal}
                    onCancel={() => setSignInModal(false)}
                    icon={<CiCircleAlert size={100} color="#0055A5" />}
                    text1={"Please SignIn to Continue"}
                    okText={"Sign In"}
                    onOk={() => navigate("/loginscreen")}
                  />
                ) : null}
              </>
            </div>
          </main>
        </>
      )}
    </>
  );
};
export default DetailedFirst;
