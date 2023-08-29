import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import Img from "../image/Img";
import useWindowSize from "../../hooks/useWindowSize";
import { IconContext } from "react-icons/lib";
import alternate from "../../assets/no-poster.png";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Carousel = ({ data, isLoading, isError, componentWidth,mediaType }) => {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const [numberOfCards, setNumberOfCards] = useState(4);
  const { width, height } = useWindowSize();
  const carouselRef = useRef(null);
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
    console.log(componentWidth);
    if (width >= 640 && width <= 768) {
      setNumberOfCards(3);
    } else if (width > 768) {
      setNumberOfCards(4);
      console.log(numberOfCards);
    } else if (width < 640) {
      console.log("hi");
      setNumberOfCards(2);
    }
  }, [width]);

  useEffect(() => {
    setStyle();
  }, [numberOfCards, componentWidth]);
  const scrollFront = () => {
    if (carouselRef.current && btnClickF < 20 / numberOfCards - 1) {
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
          }}
        ></div>
        <div
          className="itemReleaseDate skeleton"
          style={{
            width: (itemContainerStyle.width * 30) / 100,
            height: "20px",
          }}
        ></div>
      </div>
    );
  };

  return (
    <div className="container">
      {!isLoading && (
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
          <div className="scroalableList" ref={carouselRef}>
            {!isLoading ? (
              data?.map((item) => {
                const title = item.original_title || item.name;
                const wordsArray = title.split(" ");
                const nameToDisplay =
                  wordsArray.length < 3
                    ? title
                    : wordsArray[0] + " " + wordsArray[1] + " " + "...";
                return (
                  <div
                    className="itemContainer"
                    style={itemContainerStyle}
                    key={item.id}
                    onClick={()=>{navigate(
                      `/MERN-MovieCentral/${item.media_type || mediaType}/${
                        item.id
                      }`
                    );}}
                  >
                    <div className="itemPhoto">
                      <Img
                        src={
                          item.poster_path
                            ? url.poster + item.poster_path
                            : alternate
                        }
                      />
                    </div>
                    <div className="rating">
                      <IconContext.Provider
                        value={{
                          color: "yellow",
                          className: "global-class-name ratingStar",
                          size: "18px",
                        }}
                      >
                        <BsStarFill />
                        <span>{item.vote_average.toFixed(1)}</span>
                      </IconContext.Provider>
                    </div>
                    <p className="itemTitle">{nameToDisplay}</p>
                    <p className="itemReleaseDate">
                      {item.release_date &&
                        dayjs(item.release_date).format("MMM D, YYYY")}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="loadingSkeleton scroalableList">
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
  );
};

export default Carousel;
