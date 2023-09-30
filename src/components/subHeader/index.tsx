import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { Link } from "gatsby";
import MenuItem from "@mui/material/MenuItem";
import { Select } from "antd";
import { navigate } from "gatsby";
import { AiOutlineBars } from "react-icons/ai";
import "./style.scss";
import Home from "../../assets/Images/homeLtst.svg";
import Translation from "../../components/translation/index";

const SubHeader = (props: any) => {
  const [dateTime, setDateTime] = useState(moment());
  const [loading, setLoading] = useState<boolean>(true);

  const [active, setActive] = useState<any>();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(moment());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const category = getQueryParameterValue("cat");
    setActive(category);
  }, [active]);

  function getQueryParameterValue(parameterName: any) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameterName);
  }

  const Selectstyle = {
    width: 150,
    fontSize: 12,
    fontFamily: "Noto_Sans_Medium_500",
  };

  const names = [
    "Kozhikode ",
    "Kannur ",
    "Palakkad ",
    "Malappuram ",
    "Kochi ",
    "Thrissur ",
    "Thiruvananthapuram ",
  ];
  const Language = ["മലയാളം", "English"];

  const handleCategoryChange = (category: any) => {
    localStorage.setItem("setCategory", category);
    setActive(category);
  };
  const handleEditorialclick = () => {
    navigate("/pages/Editorial");
  };
  return (
    <>
      <nav className=" subHeadr-Nav d-none d-lg-block">
        <Col lg={18} offset={3} md={18} sm={18} xs={24}>
          <Row>
            <Col lg={3}>
              <div style={{ marginLeft: -10 }}>
                {/* <Select
                  className="smallTxt2"
                  bordered={false}
                  defaultValue="മലയാളം"
                  style={{
                    // ...Mainstyle.smallTxt2,
                    // width: 120,
                    outline: "none",
                  }}
                >
                  {Language.map((name) => (
                    <MenuItem style={Selectstyle} key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select> */}
                <Translation/>
              </div>
            </Col>
            <Col lg={18}>
              <div className="subHdr-ctgryLst">
                <Link
                  to="/"
                  style={{marginLeft:"35px"}}
                  className="categorylink"
                  onClick={() =>
                    handleCategoryChange('["Exclusive", "Business", "Top"]')
                  }
                >
                  <Home
                    color="#363636"
                    style={{ width: "18px", height: "35px" }}
                  />
                </Link>
                <Link
                  to="/?cat=Gulf-News"
                  className="categorylink d-md-none d-lg-block"
                >
                  <div
                    className={
                      active === "Gulf-News"
                        ? "categoryList-active"
                        : "categoryList"
                    }
                    onClick={() => handleCategoryChange('["Gulf-News"]')}
                  >
                    Gulf-News
                  </div>
                </Link>
                {/* <Link to="/" className="categorylink">
                  <div
                    className="categoryList"
                    onClick={() => handleCategoryChange('["National"]')}
                  >
                    National
                  </div>
                </Link> */}
                <Link to="/?cat=International" className="categorylink">
                  <div
                    className={
                      active === "International"
                        ? "categoryList-active"
                        : "categoryList"
                    }
                    onClick={() => handleCategoryChange('["International"]')}
                  >
                    International
                  </div>
                </Link>
                <Link to="/?cat=sports" className="categorylink">
                  <div
                    className={
                      active === "sports"
                        ? "categoryList-active"
                        : "categoryList"
                    }
                    onClick={() => handleCategoryChange('["sports"]')}
                  >
                    Sports
                  </div>
                </Link>
                <Link
                  to="/Editorial/Editorial"
                  className="categorylink d-none d-lg-block"
                >
                  <div
                    className={
                      active === "Editorial"
                        ? "categoryList-active"
                        : "categoryList"
                    }
                    onClick={() => handleCategoryChange('["Editorial"]')}
                  >
                    Editorial
                  </div>
                </Link>
                {/* <Link to="/" className="categorylink d-md-none d-lg-block">
                  <div
                    className="categoryList"
                    onClick={() => handleCategoryChange('["Life-style"]')}
                  >
                    Life Style
                  </div>
                </Link> */}
                <Link
                  to="/?cat=Economy"
                  className="categorylink d-md-none d-lg-block"
                >
                  <div
                    className={
                      active === "Economy"
                        ? "categoryList-active"
                        : "categoryList"
                    }
                    onClick={() => handleCategoryChange('["Economy"]')}
                  >
                    Economy
                  </div>
                </Link>

                {/* <Link to="/" className="categorylink">
                  <div
                    className="categoryList"
                    onClick={() => handleCategoryChange('["Regional"]')}
                  >
                    Regional
                  </div>
                </Link> */}
                <Link to="/?cat=Business" className="categorylink">
                  <div
                    className={
                      active === "Business"
                        ? "categoryList-active"
                        : "categoryList"
                    }
                    onClick={() => handleCategoryChange('["Business"]')}
                  >
                    Business
                  </div>
                </Link>
                <Link
                  to="/Podcasts/?cat=Podcasts"
                  className="categorylink d-md-none d-lg-block"
                >
                  <div
                    className={
                      active === "Podcasts"
                        ? "categoryList-active"
                        : "categoryList"
                    }
                  >
                    Podcasts
                  </div>
                </Link>
                <Link to="/" className="categorylink">
                  <div className="d-none d-block">
                    <AiOutlineBars size={20} />
                  </div>
                </Link>
              </div>
            </Col>
            <Col lg={3}>
              <Row justify={"end"}>
                <div style={{ marginRight: -10, marginTop: 3 }}>
                  <Select
                    className="smallTxt2"
                    bordered={false}
                    defaultValue="Kozhikode"
                    style={{
                      width: 120,
                      outline: "none",
                      border: "none",
                    }}
                  >
                    {names.map((name) => (
                      <MenuItem style={Selectstyle} key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Row>
            </Col>
          </Row>
        </Col>
      </nav>
    </>
  );
};

export default SubHeader;
