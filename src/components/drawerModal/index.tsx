import React from "react";
import { Modal, Row, Col, Input } from "antd";
import Logo from "../../assets/Images/ggnlogogreen.svg";
import "./style.css";
import { Link } from "gatsby";
import Instagram from "../../assets/Images/instagram.svg";
import { FaWhatsapp } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import Twitter from "../../assets/Images/twitter.svg";
import Facebook from "../../assets/Images/facebook.svg";

const { Search } = Input;

function DrawerModal(props: any) {
  const handleCategoryChange = (category: any) => {
    localStorage.setItem("setCategory", category);
    props.close();
  };
  const IndexModal = () => {
    const onSearch = () => {};

    return (
      <div className="drawerCanvas">
        <Row>
          <Col className="logoCol">
            <div className="DrawerheaderLogo" style={{ width: "100%" }}>
              <Logo className="DrawersuprabhathamLogo" />
            </div>
            <div className="DrawercategoryDrawerlink">
              <a href="https://epaper.suprabhaatham.com/EditionPage/EPpage.php?edn=Kochi&isid=SUPERD_KOC_20230627#Page/1">
                E PAPER{" "}
              </a>
              |<a href="#"> LIVE TV </a>
            </div>
            <br />
          </Col>
        </Row>
        <Row
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        ></Row>
        <br />
        <Row className="category">
          <Col md={5} className="categoryTable">
            <div className="categoryTableHead">NEWS</div>
            <ul className="listing">
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() =>
                    handleCategoryChange('["Exclusive", "Business", "Top"]')
                  }
                >
                  Latest News
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() => handleCategoryChange('["kerala"]')}
                >
                  Kerala
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() => handleCategoryChange('["International"]')}
                >
                  World
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() => handleCategoryChange('["National"]')}
                >
                  National
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() => handleCategoryChange('["Editorial"]')}
                >
                  Editorial
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={5} className="categoryTable">
            <div className="categoryTableHead">
              <Link
                to="/"
                className="decorationhead"
                onClick={() => handleCategoryChange('["sci-tech"]')}
              >
                TECH/SCIENCE
              </Link>
            </div>
            <ul className="listing">
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() => handleCategoryChange('["sci-tech"]')}
                >
                  Technology News
                </Link>
              </li>
              <li>Gadgest</li>
              <li>Weather</li>
            </ul>
          </Col>
          <Col md={5} className="categoryTable">
            <div className="categoryTableHead">
              <Link
                to="/"
                className="decorationhead"
                onClick={() => handleCategoryChange('["sports"]')}
              >
                SPORTS
              </Link>
            </div>
            <ul className="listing">
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() => handleCategoryChange('["sports"]')}
                >
                  Cricket
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() => handleCategoryChange('["sports"]')}
                >
                  Football
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() => handleCategoryChange('["sports"]')}
                >
                  Other Sports
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={5} className="categoryTable">
            <div className="categoryTableHead">
              <Link
                to="/"
                className="decorationhead"
                onClick={() => handleCategoryChange('["Gulf-News"]')}
              >
                GULF NEWS
              </Link>
            </div>
            <ul className="listing">
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() => handleCategoryChange('["Gulf-News"]')}
                >
                  Uae
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() => handleCategoryChange('["Gulf-News"]')}
                >
                  Kuwait
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() => handleCategoryChange('["Gulf-News"]')}
                >
                  Saudi
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() => handleCategoryChange('["Gulf-News"]')}
                >
                  Qatar
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() => handleCategoryChange('["Gulf-News"]')}
                >
                  Oman
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="decoration"
                  onClick={() => handleCategoryChange('["Gulf-News"]')}
                >
                  Bahrain
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4} className="categoryTable">
            <div className="categoryTableHead">
              <Link
                to="/"
                className="decorationhead"
                onClick={() => handleCategoryChange('["Education"]')}
              >
                EDUCATION
              </Link>
            </div>
            <ul className="listing">
              <li>Abroad Education</li>
              <li>Universities</li>
              <li>Scholarship</li>
              <li>
                <Link to="/VidyaPrabhaadham" className="decoration">
                  Vidya Prabhaaadham
                </Link>
              </li>
              <li>
                <Link to="/NjayarPrabhaadham" className="decoration">
                  Njayar Prabhaadham
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={5} className="categoryTable">
            <div className="categoryTableHead">CAREER</div>
            <ul className="listing">
              <li>Job News</li>
              <li>Gulf Career</li>
              <li>Abroad Career</li>
              <li>PSC/UPSC</li>
            </ul>
          </Col>
          <Col md={5} className="categoryTable">
            <div className="categoryTableHead">HOME</div>
            <ul className="listing">
              <li>Deam Home</li>
              <li>Kitchen Tips</li>
              <li>Gardening</li>
            </ul>
          </Col>
          <Col md={5} className="categoryTable">
            <div className="categoryTableHead">HEALTH</div>
            <ul className="listing">
              <li>Health News</li>
              <li>Fitness</li>
              <li>Healthy Food</li>
              <li>Life Style</li>
            </ul>
          </Col>
          <Col md={5} className="categoryTable">
            <div className="categoryTableHead">TRAVEL</div>
            <ul className="listing">
              <li>Travel Blogs</li>
              <li>Travel Kerala</li>
            </ul>
          </Col>
          <Col md={4} className="categoryTable">
            <div className="categoryTableHead">OTHERS</div>
            <ul className="listing">
              <li>Auto News</li>
              <li>New Arrivals</li>
              <li>
                <Link to="/inSnap" className="decoration">
                  In-Snap
                </Link>
              </li>
              <li>
                <Link className="decoration" to="/PrayerTime">
                  Prayer Time
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row style={{ width: "100%" }}>
          <Col md={24} style={{ textAlign: "center" }}>
            <div className="drawerEdition">
              <a> Kozhikode </a>|<a> Kannur </a>|<a> Palakkad </a>|
              <a> Malappuram </a>|<a> Kochi </a>|<a> Thrissur </a>|
              <a> Thiruvananthapuram</a>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                width: "100%",
              }}
            >
              <div className="disanceIcon">
                <Link to="https://twitter.com/suprabhaatham?lang=en">
                  <Twitter style={{ width: "30px", height: "20px" }} />
                </Link>
              </div>
              <div className="disanceIcon">
                <Link to="https://www.facebook.com/Suprabhaatham/">
                  <Facebook style={{ width: "30px", height: "20px" }} />
                </Link>
              </div>
              <div className="disanceIcon">
                <Link to="https://www.instagram.com/suprabhaathamonline/?hl=en">
                  {/* <RiInstagramFill size={21} style={gradientStyle} /> */}
                  <Instagram style={{ width: "30px", height: "20px" }} />
                </Link>
              </div>
              <div className="disanceIcon">
                <Link to="https://chat.whatsapp.com/LuNRfhZ5PAQEuucnQ2QW1H">
                  <FaWhatsapp size={25} color="green" />
                </Link>
              </div>
              <div className="disanceIcon">
                <Link to="https://www.youtube.com/@Suprabhaatham2023">
                  <AiFillYoutube size={30} color="red" />
                </Link>
              </div>
            </div>
            <br />
            <Col span={24}>
              <Row>
                <Col
                  span={10}
                  className="DrawerprivacyPolicyTxt"
                  style={{ textAlign: "end", paddingRight: "3%" }}
                >
                  Support
                </Col>
                <Col
                  span={3}
                  className="DrawerprivacyPolicyTxt"
                  style={{ textAlign: "center" }}
                >
                  Privacy Policy
                </Col>
                <Col
                  span={3}
                  className="DrawerprivacyPolicyTxt3"
                  style={{ textAlign: "center" }}
                >
                  Terms of Use
                </Col>
              </Row>
            </Col>
            <div className="copyright">
              ©suprbhatham, 2023 All rights reserved.
            </div>
          </Col>
        </Row>
      </div>
    );
  };
  return (
    <Modal
      visible={props.visible}
      onCancel={() => props.close()}
      footer={false}
      centered
      closable={true}
      width={1200}
    >
      <IndexModal />
    </Modal>
  );
}

export default DrawerModal;
