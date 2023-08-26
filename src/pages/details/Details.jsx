import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./details.scss";
import DetailBanner from "./detailBanner/DetailBanner";
import useFetch from "../../hooks/useFetch";
import TopCast from "./topCast/TopCast";
import VideoSection from "./videoSection/VideoSection";
import List from "./otherLists/List";

const Details = () => {
  const { mediaType, id } = useParams();
  const {data:videos, isLoading:videosLoading} = useFetch(`/${mediaType}/${id}/videos`);
  const {data:credits, isLoading:creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);

  const title = mediaType === "movie" ? "Similar Movies" : "Similar Tv Shows";
  console.log(videos)
  console.log(credits?.cast)
  return (
    <div>
      <DetailBanner
        video={
          videos?.results?.find((v) => {
            return v.type === "Trailer";
          }) ||
          videos?.results?.find((v) => {
            return v.type === "Teaser";
          }) ||
          videos?.results?.[0]
        }
        crew={credits?.crew}
      />
      <TopCast data={credits?.cast} loading={creditsLoading} />
      {videos?.results.length!=0&&<VideoSection data={videos?.results} loading={videosLoading} />}
      <List
        title={title}
        mediaType={mediaType}
        id={id}
        listOf={"similar"}
      />
      <List
        title={"Recommendations"}
        mediaType={mediaType}
        id={id}
        listOf={"recommendations"}
      />
    </div>
  );
};

export default Details;

