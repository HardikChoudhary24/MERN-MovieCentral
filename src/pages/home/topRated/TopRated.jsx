import React, { useEffect, useRef, useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";
import ResizeObserver from "resize-observer-polyfill";

const TopRated = () => {
  const [mediaType, setMediaType] = useState("movie");
  const { data, isLoading, isError } = useFetch(
    `/${mediaType}/top_rated?language=en-US`
  );
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

  console.log(data);

  return (
    <div className="trendingList topRatedList">
      <ContentWrapper>
        <div className="trendingHead" ref={componentRef}>
          <span>Top Rated</span>
          <SwitchTabs setMediaType={setMediaType} mediaType={mediaType} />
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

export default TopRated;
