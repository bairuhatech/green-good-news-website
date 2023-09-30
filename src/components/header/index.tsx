import React, { useEffect, useRef, useState } from "react";
import Twitter from "../../assets/Images/twitter.svg";
import Facebook from "../../assets/Images/facebook.svg";
import Instagram from "../../assets/Images/instagram.svg";
import { FaWhatsapp } from "react-icons/fa";
import Live from "../../assets/Images/live-32.svg";
import Search from "../../assets/Images/search.svg";
import Contact from "../../assets/Images/contact.svg";
import { FiMenu } from "react-icons/fi";
import { AiFillYoutube } from "react-icons/ai";
import { Drawer, Form, Input, Button } from "antd";
import { Col, Row } from "antd";
import { VscClose } from "react-icons/vsc";
import { Select } from "antd";
import MenuItem from "@mui/material/MenuItem";
import { Mainstyle } from "../../Config/Mainstyle";
import { Collapse } from "antd";
import { Link } from "gatsby";
import { navigate } from "gatsby";
import SubHeader from "../subHeader/index";
import { BiSearch } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import "./style.scss";
import gql from "graphql-tag";
import client from "../../Config/Graphql/apolloclient";
import DrawerModal from "../../components/drawerModal/index";
 import Logo from "../../assets/Images/ggnlogogreen.svg";
 const moment = require('moment');

const Header = (props: any) => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(true);
  const [error, setError] = useState(null);
  const { Panel } = Collapse;
  const [currentTime, setCurrentTime] = useState(new Date());

  const user = typeof window !== "undefined" &&
  window.JSON.parse(localStorage.getItem("user"))

  const handleProfileClick = () =>{
    navigate("/profilescreen",{
      state:{
        item: user
      },
    });
  }
  
  const date = moment();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  function callback(key: any) {
    // console.log(key);
  }
  const handleLoginClick = () => {
    navigate("/loginscreen");
  };
  const handleCategoryChange = (category: any) => {
    localStorage.setItem("setCategory", category);
    setShow(!show);
  };
  const handleClick = () => {
    navigate("/");
  };

  const loadData = (searchText: string) => {
    navigate("/searchScreen", {
      state: {
        loding: false,
      },
    });
    const SEARCH_QUERY = gql`
      query SearchNews($searchTitle: String) {
        news1: allNews(
          filters: {
            head: { contains: $searchTitle }
          }
          pagination: { page: 1, pageSize: 10000 }
          sort: "id:desc"
        ) {
          data {
            id
            attributes {
              head
              title
              body
              image
              createdAt
              categories {
                data {
                  attributes {
                    category
                  }
                }
              }
            }
          }
        }
        
        news2: allNews(
          filters: {
            user: { username: { contains: $searchTitle } }
          }
          pagination: { page: 1, pageSize: 10000 }
          sort: "id:desc"
        ) {
          data {
            id 
            attributes {
              head
              title
              body
              image
              createdAt
              categories {
                data {
                  attributes {
                    category
                  }
                }
              }
            }
          }
        }
        
        news3: allNews(
          filters: {
            body: { contains: $searchTitle }
          }
          pagination: { page: 1, pageSize: 10000 }
          sort: "id:desc"
        ) {
          data {
            id
            attributes {
              head
              title
              body
              image
              createdAt
              categories {
                data {
                  attributes {
                    category
                  }
                }
              }
            }
          }
        }
      }
    `;

    client
      .query({
        query: SEARCH_QUERY,
        variables: {
          searchTitle: searchText,
        },
      })
      .then((response: any) => {
        if (response.data) {
          const { news1, news2, news3 } = response.data;
          const uniqueIds = new Set();
          const combinedResults: any = [];
          const addUniqueData = (dataArray: any[]) => {
            dataArray.forEach((item: any) => {
              if (!uniqueIds.has(item.id)) {
                uniqueIds.add(item.id);
                combinedResults.push(item);
              }
            });
          };
          addUniqueData(news1.data || []);
          addUniqueData(news2.data || []);
          addUniqueData(news3.data || []);
          navigate("/searchScreen", {
            state: {
              item: combinedResults,
              data: searchText,
              loding: true,
            },
          });
        }
      })
      .catch((error: any) => {
        setError(error.message);
        console.log("Error:", error.message);
      });
  }

  const handleSearch = (value: any) => {
    loadData(value.searchInput);
  };
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#fff",
      }}
    >
      <Row>
        <Col lg={3} md={3} sm={3}></Col>
        <Col
          lg={18}
          md={18}
          sm={18}
          xs={24}
          className={search ? "header-MainCol2" : "header-MainCol2Sub"}
        >
          <Row className="header-Div1">
            {/* <div> */}
            <Col xs={4} md={8} lg={7}>
              <Row className="align-items-center">
                <Col md={4}>
                  <div className="header-MenuIcon">
                    <FiMenu
                      className="fiMenuIcon"
                      color="#0055A6"
                      cursor={"pointer"}
                      onClick={() => setShow(!show)}
                    />
                  </div>
                </Col>

                <Col md={16} className="d-none d-md-block">
                  <div className="header-dateDiv">
                    <div className="dateTime1 me-2">{date.format("DD")}</div>
                    <div className="dateTime2">
                      {date.format("dddd")}
                      <div className="dateTime3">
                        {currentTime.toLocaleString("en-in", {
                          month: "short",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          hour12: true,
                        })}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={16} md={8} lg={10}>
              <div className="headerLogo" onClick={handleClick}>
                <Logo className="suprabhathamLogo" />
              </div>
            </Col>
            {search ? (
              <Col xs={4} md={8} lg={7}>
                <Row
                  justify={"space-between"}
                  className="align-items-center"
                  style={{ height: "80px" }}
                >
                  <>
                    {/* <Col>
                      <div className="d-none d-md-block">
                        <Link to="https://www.youtube.com/@Suprabhaatham2023">
                          <Live style={{ width: "40px", height: "32px" }} />
                        </Link>
                      </div>
                    </Col> */}
                    <Col>
                      <div className="d-none d-md-block">
                        <Link to="https://twitter.com/suprabhaatham?lang=en">
                          <Twitter style={{ width: "22px", height: "20px" }} />
                        </Link>
                      </div>
                    </Col>
                    <Col>
                      <div className="d-none d-md-block">
                        <Link
                         to="https://www.facebook.com/profile.php?id=61551093117515&mibextid=ZbWKwL"> 
                         <Facebook style={{ width: "20px", height: "20px" }} />
                  </Link>
                      </div>
                    </Col>
                    <Col md={4} className="d-none d-lg-block">
                      {/* {user != null ? (
                        <div
                          className="contactHeader "
                          onClick={() => handleProfileClick()}
                        >
                          <Contact />
                        </div>
                      ) : (
                        <div
                          className="contactHeader "
                          onClick={() => handleLoginClick()}
                        >
                          <Contact />
                        </div>
                      )} */}
                    </Col>
                    <Col
                      onClick={() => setSearch(!search)}
                      className={search ? "" : "d-none"}
                    >
                      <div>
                        <Search
                          style={{
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </Col>
                  </>
                </Row>
              </Col>
            ) : (
              <>
                <Col md={8} lg={7} className="d-flex searchInputContainer">
                  <Form onFinish={handleSearch} style={{ display: "flex" }}>
                    <Form.Item
                      name="searchInput"
                      rules={[
                        {
                          required: true,
                          message: "Please type any word!",
                        },
                      ]}
                      className="searchInput"
                    >
                      <Input
                        className="searchInput"
                        placeholder="Search news"
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button className="searchButton" htmlType="submit">
                        <BiSearch size={23} color="#fff" />
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <div
                        style={{ marginLeft: 15 }}
                        onClick={() => setSearch(true)}
                      >
                        <RxCross2 size={20} cursor="pointer" />
                      </div>
                    </Form.Item>
                  </Form>
                </Col>
              </>
            )}
            {/* </div> */}
          </Row>
          {/* ////////DRAWER STARTS/////////// */}
          {show ? (
            <DrawerModal visible={show} close={() => setShow(false)} />
          ) : null}
        </Col>
      </Row>
      <SubHeader />
    </nav>
  );
};

export default Header;
