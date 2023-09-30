import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";

function App(props: any) {
  const [backgroundColors, setBackgroundColors] = useState<any>([]);
  const [currentTime, setCurrentTime] = useState<any>(new Date());

  const calculateTimeDifference = (time_str: any) => {
    const targetTime: any = new Date();
    const formatted_time = (time_str || "")
      .replace(/\s*\([^)]*\)/, "")
      .replace(":", ",");
    targetTime.setHours(parseInt(formatted_time), 0, 0);
    return targetTime - currentTime;
  };

  let firstDivClass = "yellow";
  let secondDivClass = "yellow";
  let thirdDivClass = "yellow";
  let fourthDivClass = "yellow";
  let fifthDivClass = "yellow";
  let sixthDivClass = "yellow";
  if (
    (currentTime.getHours() === 4 && currentTime.getMinutes() >= 57) ||
    (currentTime.getHours() > 4 && currentTime.getHours() < 6) ||
    (currentTime.getHours() === 6 && currentTime.getMinutes() <= 14)
  ) {
    firstDivClass = "red";
  } else if (
    (currentTime.getHours() === 6 && currentTime.getMinutes() >= 14) ||
    (currentTime.getHours() > 6 && currentTime.getHours() < 12) ||
    (currentTime.getHours() === 12 && currentTime.getMinutes() <= 22)
  ) {
    secondDivClass = "red";
  } else if (
    (currentTime.getHours() === 12 && currentTime.getMinutes() > 22) ||
    (currentTime.getHours() > 12 && currentTime.getHours() < 15) ||
    (currentTime.getHours() === 15 && currentTime.getMinutes() <= 30)
  ) {
    thirdDivClass = "red";
  } else if (
    (currentTime.getHours() === 15 && currentTime.getMinutes() > 30) ||
    (currentTime.getHours() > 15 && currentTime.getHours() < 18) ||
    (currentTime.getHours() === 18 && currentTime.getMinutes() <= 29)
  ) {
    fourthDivClass = "red";
  } else if (
    (currentTime.getHours() === 18 && currentTime.getMinutes() > 29) ||
    (currentTime.getHours() > 18 && currentTime.getHours() < 19) ||
    (currentTime.getHours() === 19 && currentTime.getMinutes() <= 38)
  ) {
    fifthDivClass = "red";
  } else {
    sixthDivClass = "red";
  }

  useEffect(() => {
    updateBackgroundColors();
  }, []);

  const updateBackgroundColors = () => {
    const prayerTimes = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

    const updatedColors = prayerTimes.map((prayerTime) => {
      const prayerTimeValue = props?.data?.timings[prayerTime];
      const difference = calculateTimeDifference(prayerTimeValue);

      return {
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    });

    setBackgroundColors(updatedColors);
  };

  function convertTo12HourFormat(time24Hour: any) {
    try {
      const match = time24Hour?.match(/(\d{1,2}:\d{2})/);
      if (match) {
        const [hourMinute] = match;
        const [hour, minute] = hourMinute
          .split(":")
          .map((part: any) => part?.trim());

        const hourInt = parseInt(hour);
        const isPM = hourInt >= 12;
        const hour12 = isPM ? (hourInt === 12 ? 12 : hourInt - 12) : hourInt;
        const period = isPM ? "PM" : "AM";
        return `${hour12}:${minute} ${period}`;
      } else {
        console.error("Invalid time format:", time24Hour);
        return "Invalid Time";
      }
    } catch (error) {
      console.error("Error converting time:", error);
      return "Invalid Time";
    }
  }

  const formatDate = (date: any) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const parts = date.toLocaleDateString("en-US", options)?.split(" ");
    return `${parts[0]?.padStart(2, "0")} ${parts[1]} ${parts[2]}`;
  };
  const today = new Date();
  const formattedDate = formatDate(today);
    return (
    <Row
      style={{ width: "100%", marginTop: "20px" }}
    >
      <Col xl={24} lg={24} xs={24} className="prayerTimeDiv">
        <div className="prayerTimeHEAD">
          Prayer Times in {props?.city ? (props.city) : "Kerala"}
          <div className="date">
            {props?.data?.date?.readable} <br />
            {props?.data?.date?.hijri?.day}{" "}
            {props?.data?.date?.hijri?.month?.en},{" "}
            {props?.data?.date?.hijri?.year}
            <br />
          </div>
        </div>
        <Row
          style={{
            padding: "0px 30px 0px 30px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Col lg={sixthDivClass === "red" ? 5 : 3} xs={23} className={`box ${sixthDivClass}`}>
            {sixthDivClass === "red" ? (
              <div className="prayerName">Upcoming Prayer</div>
            ) : null}
            <div className="prayerName">Fajr</div>
            {sixthDivClass === "red" ? (
              <div className="timer">
                <span>{backgroundColors[0]?.hours}</span>:
                <span>{backgroundColors[0]?.minutes}</span>:
                <span>{backgroundColors[0]?.seconds}</span>
              </div>
            ) : null}
            <div className="prayerTime">
              {convertTo12HourFormat(props?.data?.timings?.Fajr)}
            </div>
          </Col>
          <Col lg={firstDivClass === "red" ? 5 : 3} xs={23} className={`box ${firstDivClass}`}>
            {firstDivClass === "red" ? (
              <div className="prayerName">Upcoming</div>
            ) : null}
            <div className="prayerName">Sunrise</div>
            {firstDivClass === "red" ? (
              <div className="timer">
                <span>{backgroundColors[1]?.hours}</span>:
                <span>{backgroundColors[1]?.minutes}</span>:
                <span>{backgroundColors[1]?.seconds}</span>
              </div>
            ) : null}
            <div className="prayerTime">
              {convertTo12HourFormat(props?.data?.timings?.Sunrise)}
            </div>
          </Col>
          <Col lg={secondDivClass === "red" ? 5 : 3} xs={23} className={`box ${secondDivClass}`}>
            {secondDivClass === "red" ? (
              <div className="prayerName">Upcoming Prayer</div>
            ) : null}
            <div className="prayerName">Dhuhr</div>
            {secondDivClass === "red" ? (
              <div className="timer">
                <span>{backgroundColors[2]?.hours}</span>:
                <span>{backgroundColors[2]?.minutes}</span>:
                <span>{backgroundColors[2]?.seconds}</span>
              </div>
            ) : null}
            <div className="prayerTime">
              {convertTo12HourFormat(props?.data?.timings?.Dhuhr)}
            </div>
          </Col>
          <Col lg={thirdDivClass === "red" ? 5 : 3} xs={23} className={`box ${thirdDivClass}`}>
            {thirdDivClass === "red" ? (
              <div className="prayerName">Upcoming Prayer</div>
            ) : null}
            <div className="prayerName">Asr</div>
            {thirdDivClass === "red" ? (
              <div className="timer">
                <span>{backgroundColors[3]?.hours}</span>:
                <span>{backgroundColors[3]?.minutes}</span>:
                <span>{backgroundColors[3]?.seconds}</span>
              </div>
            ) : null}
            <div className="prayerTime">
              {convertTo12HourFormat(props?.data?.timings?.Asr)}
            </div>
          </Col>
          <Col lg={fourthDivClass === "red" ? 5 : 3} xs={23} className={`box ${fourthDivClass}`}>
            {fourthDivClass === "red" ? (
              <div className="prayerName">Upcoming Prayer</div>
            ) : null}
            <div className="prayerName">Maghrib</div>
            {fourthDivClass === "red" ? (
              <div className="timer">
                <span>{backgroundColors[4]?.hours}</span>:
                <span>{backgroundColors[4]?.minutes}</span>:
                <span>{backgroundColors[4]?.seconds}</span>
              </div>
            ) : null}
            <div className="prayerTime">
              {convertTo12HourFormat(props?.data?.timings?.Maghrib)}
            </div>
          </Col>
          <Col lg={fifthDivClass === "red" ? 5 : 3} xs={23} className={`box ${fifthDivClass}`}>
            {fifthDivClass === "red" ? (
              <div className="prayerName">Upcoming Prayer</div>
            ) : null}
            <div className="prayerName">Isha</div>
            {fifthDivClass === "red" ? (
              <div className="timer">
                <span>{backgroundColors[5]?.hours}</span>:
                <span>{backgroundColors[5]?.minutes}</span>:
                <span>{backgroundColors[5]?.seconds}</span>
              </div>
            ) : null}
            <div className="prayerTime">
              {convertTo12HourFormat(props?.data?.timings?.Isha)}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default App;
