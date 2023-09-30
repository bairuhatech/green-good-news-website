import React from "react";
import "./style.scss";
import { GrFacebook } from "react-icons/gr";
import { BiLogoFacebook, BiLogoWhatsappSquare } from "react-icons/bi";
import { AiFillTwitterSquare, AiOutlineTwitter } from "react-icons/ai";
import { FacebookShareButton } from "react-share";
import { API } from "../../Config/API";
import { message } from "antd";
import { IoLogoWhatsapp } from "react-icons/io";

const ShareSocial = (props: any) => {
  let Url = API.APP_URL + `/Home/DetailedNews/?id=${props?.data?.id}`;
  const handleUrlCopy = () => {
    navigator.clipboard.writeText(Url).then(() => {
      message.success("link copied");
    });
  };
  const whatsappShare = () => {
    let message = `${props?.data?.datas?.head}.....
    ${Url}`;
    let url = `https://wa.me/?text=${encodeURI(message)}`;
    // https://api.whatsapp.com/send?text="hi"
    window.open(url);
  };
  return (
    <>
      <div className="shareLink-Continer">
      <div className="shareScoial-fbIcon">
          <IoLogoWhatsapp
            size={20}
            color="black"
            cursor={"pointer"}
            onClick={() => whatsappShare()}
          />
        </div>
        <div className="shareScoial-fbIcon">
          <FacebookShareButton
            url={API.APP_URL + `/Home/DetailedNews/?id=${props?.data?.id}`}
          >
            {/* <GrFacebook size={20} color="#1877F2" cursor={"pointer"} /> */}
            <BiLogoFacebook size={20} color="black" cursor={"pointer"} />
          </FacebookShareButton>
        </div>
     
        <div className="shareScoial-fbIcon">
          <AiOutlineTwitter size={20} color="black" cursor={"pointer"} />
        </div>
      </div>
    </>
  );
};

export default ShareSocial;
