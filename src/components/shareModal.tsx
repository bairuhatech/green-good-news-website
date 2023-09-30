import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import { Col, Row } from "react-bootstrap";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiLink } from "react-icons/bi";
import { HiMail } from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa";
import { AiOutlineQrcode } from "react-icons/ai";
import { API } from "../Config/API";
import { FacebookShareButton } from "react-share";
import QRCode from 'qrcode.react';
import { LinkedinShareButton } from "react-share";
import { EmailShareButton } from "react-share";

function ShareModal(props: any) {
  const [qrCodeText, setQRCodeText] = useState('');

  let Url = API.APP_URL + `/Home/DetailedNews/?id=${props?.id}`;
  const handleUrlCopy = () => {
    navigator.clipboard.writeText(Url).then(() => {
      message.success("link copied");
    });
  };

  useEffect(() => {
    generateQRCode()
  })
  const handleShareLink = (link: any) => {
    window.open(link);
  };

  const whatsappShare = () => {
    let message = `${props.desc}.....
    ${Url}`;
    let url = `https://wa.me/?text=${encodeURI(message)}`;
    // https://api.whatsapp.com/send?text="hi"
    window.open(url);
  };

  const generateQRCode = () => {
    setQRCodeText(Url);
  }
  const downloadQRCode = () => {
    const qrCodeURL = document.getElementById('qrCodeEl')
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = `QR_Code.png${new Date()}`;
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }
  return (
    <>
      <Modal
        visible={props.open}
        onCancel={props.onCancel}
        footer={null}
        style={{ padding: "30px 24px" }}
      >
        <div className="shareModal-Txt1">Share this Article</div>
        <div className="shareModal-MainDiv">
          <div className="shareModal-IconCrcle">
            <FacebookShareButton
              url={API.APP_URL + `/Home/DetailedNews/?id=${props?.id}`}
            >
              <BsFacebook size={30} />
            </FacebookShareButton>
          </div>
          <div
            className="shareModal-IconCrcle"
            onClick={() => handleShareLink("https://twitter.com/Suprabhaatham")}
          >
            <BsTwitter size={30} />
          </div>
          <LinkedinShareButton
            url={Url}
          >
            <div className="shareModal-IconCrcle">
              <FaLinkedinIn size={30} />
            </div>
          </LinkedinShareButton>
          <div className="shareModal-IconCrcle" onClick={() => whatsappShare()}>
            <IoLogoWhatsapp size={30} />
            {/* color="#25D366" */}
          </div>
          <EmailShareButton
            subject={props.des}
            body={Url}
          >
            <div className="shareModal-IconCrcle">
              <HiMail size={30} />
            </div>
          </EmailShareButton>
        </div>
        <div className="shareModal-ScndDiv">
          <div className="sharemodal-scndDivicon" onClick={handleUrlCopy}>
            <BiLink size={30} />
            <div className="sharemodalTxt2">Copy Link</div>
          </div>
          <div className="sharemodal-scndDivicon">
            <QRCode
              style={{ height: "25px", width: "30px" }}
              id="qrCodeEl"
              value={qrCodeText}
            />
            <div className="sharemodalTxt2" onClick={downloadQRCode}>Dowload QR Code</div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ShareModal;
