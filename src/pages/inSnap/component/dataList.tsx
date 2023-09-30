import React from "react";
import "../style.scss";
import { Col, Row } from "react-bootstrap";
import Header from "../../../components/header";

const InSnapDataList = (props: any) => {
  const data =
    props && props.location && props.location.state && props.location.state.val;

  return (
    <>
      <Header />
      {data ? (
        <div className="Container">
          <div className="ContentSection">
            <Col md={12}>
              <div className="inSnapData-head">{data?.attributes?.title}</div>
              <div className="inSnapData-title">
                കഴിഞ്ഞ ദിവസത്തെ രാഹുല്‍ ഗാന്ധിയുടെ മലവപ്പുറം ജില്ലയിലെ റോഡ് ഷോ.
                ജനപങ്കാളിത്തം കൊണ്ട് ശ്രദ്ധേയമായിരുന്നു. കത്തുന്ന വെയിലിനെ പോലും
                തോല്‍പിച്ച് ഇന്ദിരയുടെ കൊച്ചുമകനെ കാണാനെത്തിയത് ആയിരങ്ങളില്‍.
                അതില്‍ പ്രായമേറിയ വല്ലിമ്മമാരേയും കാണാം. ഇതാ രാഹുല്‍ ഗാന്ധി
                തന്നെ സോഷ്യല്‍ മീഡിയയില്‍ പങ്കുവെച്ച ചില ചിത്രങ്ങള്‍.
              </div>
            </Col>
            <div className="inSnap-MainCard2">
              {data?.attributes?.imageList?.map((item: any, index: any) => {
                return (
                  <>
                    <div
                      className={
                        index === 0
                          ? "inSnap-imgCard3"
                          : index === 1
                          ? "inSnap-imgCard4"
                          : index >= 2 && index <= 4
                          ? "inSnap-imgCard5"
                          : index === 5
                          ? "inSnap-imgCard4"
                          : index === 6
                          ? "inSnap-imgCard3"
                          : index >= 7 && index <= 11
                          ? "inSnap-imgCard6"
                          : index === 12
                          ? "inSnap-imgCard4"
                          : index === 13
                          ? "inSnap-imgCard3"
                          : index >= 14 && index <= 16
                          ? "inSnap-imgCard6"
                          : ""
                      }
                      key={index}
                    >
                      <img className="inSnap-Img3" src={item} alt="" />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        "No Data Found"
      )}
    </>
  );
};

export default InSnapDataList;
