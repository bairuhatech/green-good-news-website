import React from "react";
import { Link } from "gatsby";
import { RiWhatsappFill } from "react-icons/ri";

function WhatsAppIcon() {
  return (
    <div className="floating-icon">
      <Link to="https://chat.whatsapp.com/LuNRfhZ5PAQEuucnQ2QW1H">
        <RiWhatsappFill size={44} color="#25d366" />
      </Link>
    </div>
  );
}

export default WhatsAppIcon;
