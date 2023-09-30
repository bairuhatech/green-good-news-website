import React, { useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { TfiVideoClapper } from "react-icons/tfi";
import { BsArrowUpRightCircle } from "react-icons/bs";
import "./Styles.scss";
import { navigate } from "gatsby";

const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabRoutes: any = {
    home: "/",
    highlight: "/MobileHighlights",
    reels: "/Reels",
  };

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);

    if (tabRoutes[tab]) {
      navigate(tabRoutes[tab]);
    }
  };

  return (
    <div className="bottom-navbar">
      <div
        className={`nav-item ${activeTab === "home" ? "active" : ""}`}
        onClick={() => handleTabClick("home")}
      >
        <GrHomeRounded size={17}/>
      </div>
      <div
        className={`nav-item ${activeTab === "highlight" ? "active" : ""}`}
        onClick={() => handleTabClick("highlight")}
      >
        <BsArrowUpRightCircle size={19}/>
      </div>
      <div
        className={`nav-item ${activeTab === "reels" ? "active" : ""}`}
        onClick={() => handleTabClick("reels")}
      >
        <TfiVideoClapper size={17}/>
      </div>
    </div>
  );
};

export default BottomNavbar;
