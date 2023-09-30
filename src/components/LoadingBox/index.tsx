import React from "react";
import LOGOSUB from "../../assets/Images/ggnlogogreen.svg";
import "./styles.scss";

function LoadingBox() {
  return (
    <div className="LoadingBox">
      <div className="inner">
        <LOGOSUB />
      </div>
    </div>
  );
}

export default LoadingBox;
