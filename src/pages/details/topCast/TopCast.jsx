import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import Img from "../../../components/image/Img";
import useWindowSize from "../../../hooks/useWindowSize";
import { IconContext } from "react-icons/lib";
import alternate from "../../../assets/avatar.jpeg";
import ResizeObserver from "resize-observer-polyfill";

const TopCast = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);
  const [numberOfCards, setNumberOfCards] = useState(8);
  const { width, height } = useWindowSize();
  const carouselRef = useRef(null);
  let castLength = data?.length - (data?.length % numberOfCards);
  const componentRef = useRef(null);
  const [componentWidth, setComponentWidth] = useState(0);

  
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
      setNumberOfCards(6);
    } else if (width > 768) {
      castLength = data?.length - (data?.length % numberOfCards);
      setNumberOfCards(8);
    } else if (width < 640) {
      castLength = data?.length - (data?.length % numberOfCards);
      setNumberOfCards(3);
    }
  }, [width]);

  useEffect(() => {
    setStyle();
  }, [numberOfCards, componentWidth]);
  const scrollFront = () => {
    console.log("clicked");
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
    console.log("clicked");
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
    <div className="topCastList">
      <ContentWrapper>
        <div className="trendingHead" ref={componentRef}>
          <span>Top Cast</span>
        </div>
      </ContentWrapper>

      <div className="container">
        {(!loading && ((numberOfCards*2)<=data?.length?true:false)) && (
          <>
            <button className="prevBtn sliderBtn" onClick={scrollBack} >
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
                  const name = item.original_name;
                  if (index>castLength){
                    return <></>
                  }
                    return (
                      <div className="castContainer" style={itemContainerStyle}>
                        <div className="castPhoto">
                          <Img
                            src={
                              item.profile_path
                                ? url.profile + item.profile_path
                                : alternate
                            }
                          />
                        </div>
                        <p className="itemName">{name}</p>
                        <p className="itemCharacterName">{item.character}</p>
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
    </div>
  );
};

export default TopCast;
