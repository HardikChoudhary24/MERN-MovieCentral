import React, { useEffect, useRef, useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
import ResizeObserver from "resize-observer-polyfill";
import "./list.scss";

const List = ({ title, mediaType, id ,listOf}) => {
  const { data, isLoading, isError } = useFetch(`/${mediaType}/${id}/${listOf}`);
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
  return (
    <div className="trendingList list">
      <ContentWrapper>
        <div className="trendingHead" ref={componentRef}>
          <span style={{fontSize:"1.6rem"}}>{title}</span>
        </div>
      </ContentWrapper>
      <Carousel
        data={data?.results}
        isLoading={isLoading}
        isError={isError}
        componentWidth={componentWidth}
        mediaType={mediaType}
      />
    </div>
  );
};

export default List;
