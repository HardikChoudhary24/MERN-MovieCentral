import React, { useEffect, useRef, useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Carousel from "../../../components/carousel/Carousel";
import ResizeObserver from "resize-observer-polyfill";

const Trending = () => {
  const [mediaType, setMediaType] = useState("movie");
  const { data, isLoading, isError } = useFetch(
    `/trending/${mediaType}/week?language=en-US`
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
    <div className="trendingList">
      <ContentWrapper>
        <div className="trendingHead" ref={componentRef}>
          <span>Trending Now</span>
          <SwitchTabs setMediaType={setMediaType} mediaType={mediaType} />
        </div>
      </ContentWrapper>
      <Carousel
        data={data?.results}
        isLoading={isLoading}
        isError={isError}
        componentWidth={componentWidth}
      />
    </div>
  );
};

export default Trending;
