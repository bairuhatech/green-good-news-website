import React from "react";
import Avatar from "@mui/material/Avatar";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import FORMAT_TIME from "../../utils/dateFormatter";

function CommentItem(props: any) {
  let data = props.item.attributes;
  return (
    <>
      <hr />
      <div className="CommentItem-box1">
        <div className="CommentItem-box2">
          <Avatar>{data?.user && data?.user[0]}</Avatar>
        </div>
        <div style={{ margin: 3 }} />
        <div className="CommentItem-box3">
          <div>
            <strong className="CommentItem-txt1">{data.user}</strong>
            <p className="CommentItem-txt2">{FORMAT_TIME(data.createdAt)}</p>
          </div>
          <div>{data.comment}</div>
          <div>
            <BsHandThumbsUp size={15} />
            <BsHandThumbsDown size={15} style={{ margin: 10 }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentItem;
