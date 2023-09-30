import React, { useState } from "react";
import "./Styles.scss";
import { FaHeart, FaEllipsisV } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import Comment from "../assets/Images/comment.svg";
import Share from "../assets/Images/share.svg";
import ShareModal from '../components/shareModal'

const ReelsActions = ({
  id,
  initialLikes,
  initialComments,
  initialShares,
}: any) => {
  const [likes, setLikes] = useState(initialLikes);
  const [modalopen,setModalOpen] = useState(false)

  const handleLikeClick = () => {
    setLikes(
      (prevState: any) => prevState + (prevState === initialLikes ? 1 : -1)
    );
  };

  const open = () => {
    setModalOpen(true)
  }
  const close = () => {
    setModalOpen(false)
  }

  return (
    <div
      className="overlay-icons"
      style={{ height: "90%", display: "flex", justifyContent: "flex-end" }}
    >
      {likes > initialLikes ? (
        <FaHeart
          size={25}
          className="heart-icon mb-1"
          onClick={handleLikeClick}
          color="red"
        />
      ) : (
        <FiHeart
          size={25}
          className="heart-icon liked mb-1"
          onClick={handleLikeClick}
        />
      )}
      <span className="action-count " style={{ marginBottom: "18px" }}>
        {likes}
      </span>
      {/* <Comment className="comment-icon mb-1" size={25} color="#ffff" style={{height:"23px"}}/>
      <span className="action-count" style={{ marginBottom: "18px" }}>1.4k</span> */}
      <Share className="share-icon mb-1"  style={{height:"23px"}} color="#ffff" onClick={() => setModalOpen(!modalopen)}/>
      <span className="action-count">{initialShares}</span>
      {modalopen && (
        <ShareModal open={open} onCancel={close}/>
      )}
      
      <FaEllipsisV className="ellipsis-icon mt-3" color="#ffff" size={20} />
    </div>
  );
};

export default ReelsActions;
