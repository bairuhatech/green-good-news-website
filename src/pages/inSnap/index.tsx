import React, { useEffect, useState } from "react";
import { API } from "../../Config/API";
import { GET } from "../../utils/api";
import "./style.scss";
import Header from "../../components/header";
import { navigate } from "gatsby";
import { Skeleton } from "antd";

function InSnap() {
  const [data, setData] = useState() as any;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    let url = API.IN_SNAP;
    const response: any = await GET(url);
    setData(response.data);
    setIsLoading(false);
  };
  const handleClick = (val: any) => {
    navigate("/inSnap/component/dataList", {
      state: {
        val,
      },
    });
  };
  return (
    <>
      <Header />
      {isLoading ? (
        <Skeleton active />
      ) : (
        <div className="Container">
          <div className="ContentSection">
            <div className="inSnap-Card">
              <div className="inSnap-MainCard2">
                {data?.map((item: any, index: number) => {
                  if (index < 1) {
                    return (
                      <div className="inSnap-imgCard2">
                        <div
                          className="inSnap-title"
                          onClick={() => handleClick(item)}
                        >
                          {item?.attributes?.title}
                        </div>
                        <img
                          className="inSnap-Img"
                          src={item?.attributes?.image}
                          onClick={() => handleClick(item)}
                          alt=""
                        />
                      </div>
                    );
                  }
                  return null;
                })}
                {data?.map((item: any, index: number) => {
                  if (index > 0) {
                    return (
                      <div className="inSnap-imgCard0">
                        <div
                          className="inSnap-title"
                          onClick={() => handleClick(item)}
                        >
                          {item?.attributes?.head}
                        </div>
                        <img
                          className="inSnap-Img"
                          src={item?.attributes?.image}
                          onClick={() => handleClick(item)}
                          alt=""
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InSnap;
