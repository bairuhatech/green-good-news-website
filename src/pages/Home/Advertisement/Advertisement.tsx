import React from "react";

const Advertisement = (props: any) => {
  const { width = "100%", height = "120px" } = props;
  return (
    <div
      style={{
        width: width,
        height: height,
        borderRadius: "8px",
      }}
    >
      <img
        style={{ width: "100%",height:"120px",objectFit:"cover" }}
        src={props.adsTilte}
      ></img>
    </div>
  );
};

export default Advertisement;
// https://s01.sgp1.digitaloceanspaces.com/large/868650-43870-qczporqhod-1476987508.jpg