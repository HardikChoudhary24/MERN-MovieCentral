import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/image/Img";
import useWindowSize from "../../../hooks/useWindowSize";
import { IconContext } from "react-icons/lib";
import ResizeObserver from "resize-observer-polyfill";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import { BsPlayFill } from "react-icons/bs";

const VideoSection = ({ data, loading }) => {
  const [numberOfCards, setNumberOfCards] = useState(5);
  const { width, height } = useWindowSize();
  const carouselRef = useRef(null);
  let castLength = data?.length - (data?.length % numberOfCards);
  const componentRef = useRef(null);
  const [componentWidth, setComponentWidth] = useState(0);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries && entries.length > 0) {
        const newWidth = entries[0].contentRect.width;
        setComponentWidth(newWidth);
      }
    });
    if (componentRef.current) {
      resizeObserver.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        resizeObserver.unobserve(componentRef.current);
      }
    };
  }, []);

  const [itemContainerStyle, setItemContainerStyle] = useState({
    width: (componentWidth - (numberOfCards - 1) * 10) / numberOfCards,
  });
  let btnClickF = 0;
  useEffect(() => {
    btnClickF = 0;
    carouselRef.current.style.transform = `translateX(0px)`;
  }, [data]);
  const setStyle = () => {
    if (numberOfCards > 0) {
      const imgWidth = componentWidth - (numberOfCards - 1) * 10;
      setItemContainerStyle({
        width: imgWidth / numberOfCards,
      });
    }
  };

  useEffect(() => {
    if (width >= 640 && width <= 768) {
      castLength = data?.length - (data?.length % numberOfCards);
      setNumberOfCards(4);
    } else if (width > 768) {
      castLength = data?.length - (data?.length % numberOfCards);
      setNumberOfCards(5);
    } else if (width < 640) {
      castLength = data?.length - (data?.length % numberOfCards);
      setNumberOfCards(3);
    }
  }, [width]);

  console.log("data?.results ", data);
  useEffect(() => {
    setStyle();
  }, [numberOfCards, componentWidth]);
  const scrollFront = () => {
    console.log(carouselRef.current);
    console.log(btnClickF < castLength / numberOfCards - 1);

    if (carouselRef.current && btnClickF < castLength / numberOfCards - 1) {
      btnClickF++;
      carouselRef.current.style.transform = `translateX(-${
        (componentWidth + 10) * btnClickF
      }px)`;
    } else if (carouselRef.current) {
      btnClickF = 0;
      carouselRef.current.style.transform = `translateX(0px)`;
    }
  };
  const scrollBack = () => {
    if (carouselRef.current && btnClickF > 0) {
      btnClickF--;
      carouselRef.current.style.transform = `translateX(-${
        (componentWidth + 10) * btnClickF
      }px)`;
    }
  };

  const skItem = () => {
    return (
      <div className="skeletonItem" style={itemContainerStyle}>
        <div className="itemPhoto skeleton"></div>
        <div
          className="itemTitle skeleton"
          style={{
            width: (itemContainerStyle.width * 60) / 100,
            height: "20px",
            margin: "15px 0",
          }}
        ></div>
        <div
          className="itemReleaseDate skeleton"
          style={{
            width: (itemContainerStyle.width * 30) / 100,
            height: "20px",
            margin: "15px 0",
          }}
        ></div>
      </div>
    );
  };

  return (
    <div className="topCastList videoSection">
      <ContentWrapper>
        <div className="trendingHead" ref={componentRef}>
          <span>Original Videos</span>
        </div>
      </ContentWrapper>

      <div className="container">
        {!loading && (numberOfCards * 2 <= data?.length ? true : false) && (
          <>
            <button className="prevBtn sliderBtn" onClick={scrollBack}>
              <IconContext.Provider
                value={{
                  color: "white",
                  className: "global-class-name",
                  size: "40px",
                }}
              >
                <MdNavigateBefore />
              </IconContext.Provider>
            </button>
            <button className="nextBtn sliderBtn" onClick={scrollFront}>
              <IconContext.Provider
                value={{
                  color: "white",
                  className: "global-class-name",
                  size: "40px",
                }}
              >
                <MdNavigateNext />
              </IconContext.Provider>
            </button>{" "}
          </>
        )}
        <ContentWrapper>
          <div className="carouselContainer" style={{ width: componentWidth }}>
            <div className="castscroalableList" ref={carouselRef}>
              {!loading ? (
                data?.map((item,index) => {
                  const thumbnail = `https://img.youtube.com/vi/${item.key}/mqdefault.jpg`;
                  return (
                    <div className="castContainer" style={itemContainerStyle}>
                      <div
                        className="videoThumbnail"
                        onClick={() => {
                          setShow(true);
                          setVideoId(item?.key);
                        }}
                      >
                        <Img src={thumbnail} />
                      </div>
                      <p className="itemName">{item.name}</p>
                      <IconContext.Provider
                        value={{
                          color: "white",
                          className: "global-class-name",
                          size: "40px",
                        }}
                      >
                        <BsPlayFill
                          className="playIcon"
                          onClick={() => {
                            setShow(true);
                            setVideoId(item?.key);
                          }}
                        />
                      </IconContext.Provider>
                    </div>
                  );
                })
              ) : (
                <div className="loadingSkeleton castscroalableList">
                  {skItem()}
                  {skItem()}
                  {skItem()}
                  {skItem()}
                  {skItem()}
                  {skItem()}
                  {skItem()}
                  {skItem()}
                  {skItem()}
                  {skItem()}
                  {skItem()}
                  {skItem()}
                  {skItem()}
                  {skItem()}
                </div>
              )}
            </div>
          </div>
        </ContentWrapper>
      </div>
      <VideoPopup
        setShow={setShow}
        setVideoId={setVideoId}
        show={show}
        videoId={videoId}
      />
    </div>
  );
};

export default VideoSection;
