import React, { useEffect, useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { countries, icons } from "../../../utils/country";
import { Link } from "react-router-dom";
import "./style.scss";
import Img from "../../../components/image/Img";
import { IconContext } from "react-icons/lib";
import { BsPlayFill } from "react-icons/bs";

const StreamingPlatforms = ({
  serviceData,
  serviceLoading,
  countryData,
  iconLoading,
}) => {
  const [country, setCountry] = useState("in");
  // const [icons, setIcons] = useState(countryData?.result?.[country]?.services);

  const arr = [];
  // useEffect(() => {
  //   if (!iconLoading) {
  //     setIcons(countryData?.result?.[country]?.services);
  //   }
  // }, [country, serviceData, countryData]);
  console.log(serviceData);
  console.log(countryData);

  const skel = () => {
    return (
      <div className="platformInfo">
        <div className="serviceIcon skeleton" />
        <div className="playTrailer skeleton"></div>
        <div className="playTrailer skeleton" style={{margin:"10px 0"}}></div>
      </div>
    );
  };
  return (
    <div className="streamingList" style={{ margin: "30px 0 60px 0" }}>
      <ContentWrapper>
        <div className="box">
          <div className="trendingHead">
            <span className="header">All Watch Options</span>
          </div>
          <div className="countrySelect">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select a country</option>
              {countries?.map((c) => {
                return (
                  <option key={c.countryCode} value={c.countryCode}>
                    {c.country}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="platformContainer">
            {!serviceLoading ? (
              serviceData?.result?.streamingInfo?.[country] === undefined ? (
                <div>
                  <p style={{ color: "white" }}> No available platforms in the selected region !</p>
                </div>
              ) : (
                serviceData?.result?.streamingInfo?.[country]?.map((item) => {
                  if (!arr.includes(item?.service)) {
                    arr.push(item?.service);
                    return (
                      <div className="platformInfo">
                        {!icons?.[item?.service] ? (
                          <div className="serviceIcon" style={{display:"flex" , alignItems:"center",justifyContent:"center"}}>
                            <p style={{fontSize:"1rem" ,color:"white" ,textTransform:"capitalize"}}>{item?.service}</p>
                          </div>
                        ) : (
                          <Img
                            src={icons?.[item?.service]}
                            className="serviceIcon"
                          />
                        )}

                        <p className="serviceName">{item?.service}</p>
                        {item?.price && (
                          <span className="price">
                            From {item?.price?.formatted}
                          </span>
                        )}
                        <Link
                          to={item?.link}
                          style={{ textDecoration: "none" }}
                        >
                          <button
                            className="playTrailer"
                            onClick={() => {
                              setShow(true);
                              setVideoId(video?.key);
                            }}
                          >
                            <IconContext.Provider
                              value={{
                                color: "white",
                                className: "global-class-name ratingStar",
                                size: "18px",
                              }}
                            >
                              <BsPlayFill />
                              <span>Watch</span>
                            </IconContext.Provider>
                          </button>
                        </Link>
                      </div>
                    );
                  }
                })
              )
            ) : (
              skel()
            )}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default StreamingPlatforms;

// icons?.[item?.service].images.darkThemeImage ||
// icons?.[item?.service].images.lightThemeImage
