import React, { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import { Mainstyle } from "../Config/Mainstyle";

function PostActions(props: any) {
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "96%",
  };

  const iconGroupStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };
  const { data } = props;

  const handleClick = () => {
    if (isClicked) {
      setCount(count + 1);
    } else {
      if (count > 0) {
        setCount(count - 1);
      }
    }
    setIsClicked(!isClicked);
  };
  return (
    <>
      <div className="breadcums mb-3 " />
      <div style={{ width: "100%" }}>
        <div style={containerStyle}>
          <div style={iconGroupStyle}>
            <div onClick={handleClick}>
              {isClicked ? (
                <BiSolidLike size={24} color="#363636" />
              ) : (
                <BiSolidLike size={24} color="#09C0FF" />
              )}
            </div>
            <span style={{ ...Mainstyle.smallTxt, marginRight: "12px" }}>
              {data && data?.like && data?.like + count}
              {/* {count} */}
            </span>
            <FaRegCommentDots size={22} color="#363636" />
            <span style={{ ...Mainstyle.smallTxt, marginRight: "12px" }}>
              {/* 2.5k */}
            </span>
            <TbShare3
              size={22}
              color="#363636"
              cursor={"pointer"}
              onClick={() => props.setIsModalVisible()}
            />
          </div>
          <BiDotsVerticalRounded size={23} color="#363636" />
        </div>
      </div>
      <br />
      <div className="breadcums " />
    </>
  );
}

export default PostActions;
