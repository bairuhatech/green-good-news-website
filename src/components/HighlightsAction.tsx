import React, { useState } from "react";
import "./Styles.scss";
import { FaHeart, FaEllipsisV } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import Comment from "../assets/Images/comment.svg";
import Share from "../assets/Images/share.svg";
import { FiHeart } from "react-icons/fi";

const HightlightsAction = ({ initialLikes }: any) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop:"28x"
      }}
    >
      <FiHeart size={24} color="#ffff" />
      <Comment />
      <Share />
      <FaEllipsisV className="ellipsis-icon" color="#ffff" size={20} />
    </div>
  );
};

export default HightlightsAction;
