import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoMdShare } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { Link, navigate } from "gatsby";
import { BsThreeDotsVertical } from "react-icons/bs";
import ShareModal from "./shareModal";

const LikeAndShare = (props: any) => {
  const [show, setShow] = useState(false);
  const { width = "50px", height = "100%" } = props;

  return (
    <div
      style={{
        width: width,
        height: height,
        display: "flex",
        // alignItems: "center",
        justifyContent: "end",
        flexDirection: props.direction,
      }}
    >
      <IoMdShare
        size={12}
        cursor={"pointer"}
        color="rgb(54 54 54 / 50%)"
        onClick={() => setShow(true)}
      />
      {/* 
      <BsThreeDotsVertical
        size={12}
        color="rgb(54 54 54 / 50%)"
        cursor={"pointer"}
        onClick={() => setLiked(!liked)}
      // /> */}
      {show ? (
        <ShareModal
          open={show}
          onCancel={() => setShow(false)}
          id={props?.id}
          desc={props?.desc}
        />
      ) : null}
    </div>
  );
};

export default LikeAndShare;
