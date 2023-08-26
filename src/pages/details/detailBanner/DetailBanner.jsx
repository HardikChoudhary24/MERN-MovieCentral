import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/image/Img";
import "../detailBanner/style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import alternate from "../../../assets/no-poster.png";
import { IconContext } from "react-icons/lib";
import { BsStarFill, BsPlayFill } from "react-icons/bs";
import dayjs from "dayjs";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailBanner = ({ video, crew }) => {
  const { mediaType, id } = useParams();
  const [backgroundImg, setBackgroundImg] = useState(null);
  const { data, isLoading, isError } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  console.log("video ", video);
  const director = crew?.filter((f) => f.job === "Director");
  const writers = crew?.filter(
    (f) => f.job === "Writer" || f.job === "Screenplay" || f.job === "Story"
  );

  useEffect(() => {
    const bgUrl = url.backdrop + data?.backdrop_path;
    setBackgroundImg(bgUrl);
  }, [data]);

  function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let result = "";
    if (hours > 0) {
      result += `${hours} hr`;
      if (remainingMinutes > 0) {
        result += ` ${remainingMinutes} min`;
      }
    } else {
      result = `${remainingMinutes} min`;
    }

    return result;
  }

  console.log(video);

  const skItem = () => {
    return (
      <>
        <div className="photo">
          <div className="itemPhoto skeleton"></div>
        </div>
        <div className="infoCont infoBox">
          <p className="title skeleton"></p>
          <p className="tagline skeleton"></p>
          <p className="genres skeleton"></p>
          <div className="box">
            <div className="rating skeleton"></div>
            <button className="playTrailer skeleton"></button>
          </div>
          <div className="overview overviewSkeleton">
            <span className="skeleton"></span>
            <span className="skeleton"></span>
            <span className="skeleton"></span>
            <span className="skeleton"></span>
            <span className="skeleton"></span>
            <span className="skeleton"></span>
            <span className="skeleton"></span>
          </div>
          <div className="infoContainer infoContainerSkeleton">
            <div className="flexRow">
              <span className="skeleton"></span>
              <span className="skeleton"></span>
              <span className="skeleton"></span>
            </div>
          </div>
          <hr />
          <div className="info">
            <p className="skeleton"></p>
          </div>
          <hr />
          <div className="info">
            <p className="skeleton"></p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="detailBanner">
        {!isLoading && (
          <div className="bannerImg">
            <Img src={backgroundImg} className={"backImg"} />
          </div>
        )}
        <div className="layer"></div>
        <ContentWrapper>
          <div className="detailsContainer">
            {!isLoading ? (
              <>
                <div className="photo">
                  <div className="itemPhoto">
                    <Img
                      src={
                        data?.poster_path
                          ? url.poster + data?.poster_path
                          : alternate
                      }
                    />
                  </div>
                </div>
                <div className="infoBox">
                  <p className="title">
                    {data?.original_title || data?.title || data?.name}
                  </p>
                  <p className="tagline">{data?.tagline}</p>
                  <p className="genres"></p>
                  <div className="box">
                    <div className="rating">
                      <IconContext.Provider
                        value={{
                          color: "yellow",
                          className: "global-class-name ratingStar",
                          size: "18px",
                        }}
                      >
                        <BsStarFill />
                        <span>{data?.vote_average.toFixed(1)}</span>
                      </IconContext.Provider>
                    </div>
                    {video && (
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
                          <span>Trailer</span>
                        </IconContext.Provider>
                      </button>
                    )}
                  </div>
                  <div className="overview">
                    <p>Overview</p>
                    <span>{data?.overview}</span>
                  </div>
                  <div className="infoContainer">
                    <div
                      className={
                        data?.release_date && data?.runtime ? "" : "flexRow"
                      }
                    >
                      <p>Status:</p>
                      <span>{data?.status}</span>
                    </div>
                    {data?.release_date && (
                      <div>
                        <p>Release Date:</p>
                        <span>
                          {data?.release_date &&
                            dayjs(data?.release_date).format("MMM D, YYYY")}
                        </span>
                      </div>
                    )}
                    {data?.runtime && (
                      <div>
                        <p>Runtime:</p>
                        <span>{formatTime(data?.runtime)}</span>
                      </div>
                    )}
                  </div>
                  <hr />
                  {director?.length > 0 && (
                    <>
                      <div className="info">
                        <p>Director:</p>
                        <span>{director[0].name}</span>
                      </div>
                      <hr />
                    </>
                  )}
                  {writers?.length > 0 && (
                    <>
                      <div className="info">
                        <p>Writer:</p>
                        {writers.length === 1 ? (
                          <span>{writers[0]?.name}</span>
                        ) : (
                          writers.map((w, index) => {
                            const name = w?.name;
                            const comma =
                              index === writers.length - 1 ? "" : ",";
                            return <span>{`${name}${comma}`}</span>;
                          })
                        )}
                      </div>
                      <hr />
                    </>
                  )}
                  {data?.created_by?.length > 0 && (
                    <>
                      <div className="info">
                        <p>Creator:</p>
                        {writers?.length === 1 ? (
                          <span>{data?.created_by?.[0]?.name}</span>
                        ) : (
                          data?.created_by?.map((w, index) => {
                            const name = w?.name;
                            const comma =
                              index === data?.created_by?.length - 1 ? "" : ",";
                            return <span>{`${name}${comma}`}</span>;
                          })
                        )}
                      </div>
                      <hr />
                    </>
                  )}
                </div>
              </>
            ) : (
              skItem()
            )}
            {/* <p className="directorName">{data?.}</p> */}
          </div>
        </ContentWrapper>
        <VideoPopup
          setShow={setShow}
          setVideoId={setVideoId}
          show={show}
          videoId={videoId}
        />
      </div>
    </>
  );
};

export default DetailBanner;
