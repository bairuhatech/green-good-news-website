import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { BsCheckCircleFill } from "react-icons/bs";
import { Progress } from "antd";
import "./style.scss";
import { API } from "../../Config/API";
import { GET, POST, PUT } from "../../utils/api";
import axios from "axios";

function PollingCard() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const [showIcon, setShowIcon] = useState<number | null>(null);
  const [data, setData] = useState<any[]>();
  const [option, setOption] = useState<any>();
  const [item, setItem] = useState([]) as any;
  const [isVote, setIsVote] = useState([]);
  let id = item.id;
  useEffect(() => {
    loadDate();
  }, []);
  const loadDate = async () => {
    let url = API.GET_POLLS;
    const response: any = await GET(url);
    let pollOptionList = response.poll_options;

    setOption(pollOptionList);
    let obj: any = [];
    obj.push(response);
    setData(obj);
  };

  const handleItemClick = async (item: any, index: any) => {
    if (selectedItem === null) {
      setShowIcon(index);
      setSelectedItem(index);

      const updatedOptions: any = option.map((option: any, i: any) => {
        if (i === index) {
          return { ...option, vote: option.vote + 1 };
        } else {
          return option;
        }
      });
      let url2 = `${API.ADD_VOTE}/${item.id}`;
      const response: any = await PUT(url2, {});
    }
  };

  return (
    <Row style={{ padding: "12px 12px" }}>
      <Col span={24} className="pollingCard-Col1">
        {data?.map((item: any) => {
          return (
            <>
              <div className="pollingCad-Txt1">{item?.questions}</div>
            </>
          );
        })}

        {option?.map((item: any, index: any) => {
          return (
            <>
              <Row
                key={index}
                onClick={() => handleItemClick(item, index)}
                style={{
                  padding: 5,
                }}
              >
                <Row className="pollingCard-Col2">
                  <Col className="pollingCard-Txt2">
                    {item.options}
                    <span style={{ paddingLeft: 20 }}>
                      {showIcon === index ? (
                        <BsCheckCircleFill color="#19f700" />
                      ) : null}
                    </span>
                  </Col>
                  {selectedItem !== null ? (
                    <>
                      <Progress
                        strokeColor={"rgb(94 114 114 / 57%)"}
                        percent={item.vote}
                      />
                    </>
                  ) : null}
                </Row>
              </Row>
            </>
          );
        })}
      </Col>
    </Row>
  );
}

export default PollingCard;
