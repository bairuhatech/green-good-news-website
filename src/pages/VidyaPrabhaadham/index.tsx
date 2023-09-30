import React from "react";
import { useEffect, useState } from "react";
import { Row, Col, Button, Input, Card, Skeleton } from "antd";
import { Mainstyle } from "../../Config/Mainstyle";
import moment from "moment";
import { GetVidyaPrabhaadham } from "../../utils/api";
import ButtonPrimary from "../../components/buttonPrimary";
import Advertisement from "../Home/Advertisement/Advertisement";
import BCEditorial from "../../components/BCEditorial";
import LikeAndShare from "../../components/LikeAndShare";
import LoadingBox from "../../components/LoadingBox/LoadingBox2";
import Header from "../../components/header";
import ShareModal from "../../components/shareModal";
import { navigate } from "gatsby";
import "./styles.css";

const { Meta } = Card;

const { TextArea } = Input;

function VidyaPrabhaadham() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  

  useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      let respi: any = await GetVidyaPrabhaadham();
      console.log("==========wweee==============",respi);
      if (respi.networkStatus == 7) {
        setData(respi?.data?.vidyaprabhaadhams?.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);

    }
  };

  const handleClick = (data:any) => {
    navigate(`/PrabhaadhamScreen`, {
      state: {
        item:data,
        // id,
      },
    });
  };

  return (
    <>
     
     {loading ? (
        <LoadingBox/>
      ) : (
        <>
        <Header />
        <main className="Container">
          <div className="ContentSection">
            <Row>
                {data && data.map((item:any) =>{
                 return(
                    <Col xl={12} lg={12} md={12} sm={24} xs={24}
                    onClick={() => handleClick(item)}
                    >
                    <br/>
                    <br/>
                    <Card
                      hoverable
                      
                      cover={
                        <img
                          alt="example"
                          src="https://suprabhaatham.com/wp-content/themes/suprabhaatham/img/default.jpg"
                        />
                      }
                    >
                      <Meta
                        title={item?.attributes.title}
                      />
                    </Card>
                  </Col>
                 )
                  
                  
                })}
              
            </Row>
          </div>
        </main>
        </>
      )}
    </>
  );
}

export default VidyaPrabhaadham;
