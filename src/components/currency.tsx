import React, { useEffect, useState } from "react";
import "./Styles.scss";
import { Col, Row } from "antd";
import axios from "axios";
import { MdCurrencyRupee } from "react-icons/md";
import ButtonPrimary from "./buttonPrimary";
function Currency() {
  const [corrency, setCorrency] = useState([]);
  useEffect(() => {
    fetchLatestShortsVideo();
  }, []);
  const fetchLatestShortsVideo = async () => {
    const urls = [
      "https://open.er-api.com/v6/latest/USD",
      "https://open.er-api.com/v6/latest/EUR",
      "https://open.er-api.com/v6/latest/OMR",
      "https://open.er-api.com/v6/latest/SAR",
    ];

    const data: any = [];

    for (const url of urls) {
      try {
        const response = await axios.get(url);
        const rate = response.data.rates;

        let country = "";
        if (url.includes("USD")) {
          country = "ഡോളർ";
        } else if (url.includes("EUR")) {
          country = "യൂറോ";
        } else if (url.includes("OMR")) {
          country = "ഒമാനി റിയാൽ";
        } else if (url.includes("SAR")) {
          country = "സൗദി റിയാൽ";
        }
        data.push({ value: rate.INR, country });
      } catch (error) {
        console.error(error);
      }
    }
    setCorrency(data);
  };

  return (
    <Row style={{ padding: "12px 12px" }}>
      <Col span={24} className="corrency-Col">
        <div className="corrency-head">
          <ButtonPrimary name={"Currency"} />
        </div>

        {corrency?.map((item: any, i) => {
          return (
            <div className="corrency-item">
              <p className="corrency-Txt">{item.country}</p>
              <p className="corrency-Txt">
                <MdCurrencyRupee color="green" /> {item.value.toFixed(2)}
              </p>
            </div>
          );
        })}
      </Col>
    </Row>
  );
}

export default Currency;
