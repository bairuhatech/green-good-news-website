import React from "react";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Card,
  Skeleton,
  Space,
  Table,
  Tag,
} from "antd";
import Header from "../../components/header";
import moment from "moment";
import LoadingBox from "../../components/LoadingBox/LoadingBox2";
import "./styles.css";
import axios from "axios";
import Item from "antd/es/list/Item";
import { format } from "path";
import Mmm from "./mmm";

const { Search } = Input;

function prayerScreeen() {
  const [form] = Form.useForm();
  const [data, setdata] = useState<any>();
  const [isloding, setIsloding] = useState<Boolean>(true);
  const [city, setCity] = useState<any>("");
  const [] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const onSearch = async (value: any) => {
    setIsloding(true);
    setCity(value.city)
    const city = value.city;
    const country = value.country;
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = 10;
    const options = {
      method: "GET",
      // url: `https://muslimsalat.p.rapidapi.com/${value}.json`,
      url: `https://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=${city}&country=${country}&method=5`,
    };

    try {
      const response = await axios.request(options);
      console.log("search data ", response.data);
      let data = [];
      data = response.data.data;
      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const mmm: any = data[currentDay - 1];
      setdata(mmm);
      setIsloding(false);
    } catch (error) {
      console.error(error);
      setIsloding(false);
    }
  };

  // setCurrentDate(formattedDate);
  const loadData = async () => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const options = {
      method: "GET",
      url: `https://api.aladhan.com/v1/calendarByCity/${currentYear}/${currentMonth}?city=kerala&country=india&method=5`,
    };

    try {
      const response = await axios.request(options);
      let data = [];
      data = response.data.data;
      const currentDate = new Date();

      const currentDay = currentDate.getDate();

      const mmm: any = data[currentDay - 1];
      setdata(mmm);

      setIsloding(false);
    } catch (error) {
      console.error(error);
      setIsloding(false);
    }
  };
  return (
    <>
      <Header />
      {isloding ? (
        <LoadingBox />
      ) : (
        <>
          <main className="ContainerPrayer">
            <div className="ContentSection">
              <Row className="prayer-firstimageRow" style={{display: "flex", justifyContent: "space-between"}}>
                <Col
                  xl={15}
                  lg={15}
                  xs={24}
                  className="prayer-firstimage"
                >
                  <div className="prayer-firstimagesubHead">
                    Today Islamic Date
                  </div>
                </Col>
                <Col
                  xl={8}
                  lg={8}
                  xs={24}
                  className="prayer-Secondimage"
                >
                  <div className="prayer-firstimageHead">
                    Search your place here
                  </div>
                  <Form
                    onFinish={onSearch}
                    form={form}
                  >
                    <div>Country</div>
                    <Form.Item name="country">
                      <Input />
                    </Form.Item>
                    <div>City</div>
                    <Form.Item name="city">
                      <Input />
                    </Form.Item>
                    <Button htmlType="submit">Find</Button>
                  </Form>
                </Col>
              </Row>
              <Mmm data={data} city={city} />
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default prayerScreeen;
