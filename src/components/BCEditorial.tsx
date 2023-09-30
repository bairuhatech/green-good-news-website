import React from "react";
import { Breadcrumb } from "antd";
import { Link } from "gatsby";
import { IoIosArrowForward } from "react-icons/io";

const BCEditorial = (props: any) => {
  const text = {
    color: "rgba(54, 54, 54, 0.8)",
    textDecoration: "none",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 12,
  };
  return (
    <div className="breadcrumbs">
      <Breadcrumb
        separator={
          <span style={{ color: "#ffff" }}>
            <IoIosArrowForward color="rgba(54, 54, 54, 0.8)" />
          </span>
        }
      >
        <Breadcrumb.Item>
          <Link to="/" style={text}>
            HOME
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="#" style={text}>
            EDITORIAL
          </a>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default BCEditorial;
