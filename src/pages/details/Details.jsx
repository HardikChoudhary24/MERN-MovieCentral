import React from "react";
import { useParams } from "react-router-dom";
import "./details.scss";
import DetailBanner from "./detailBanner/DetailBanner";
import useFetch from "../../hooks/useFetch";

const Details = () => {
  const { mediaType, id } = useParams();
  const {data:videos, isLoading:videosLoading} = useFetch(`/${mediaType}/${id}/videos`);
  const {data:credits, isLoading:creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);
  console.log(videos)

  return (
    <div>
      <DetailBanner video={videos?.results?.find((v)=>{return  v.type==="Trailer" ||v.type==="Teaser"}) || videos?.results?.[0]} crew={credits?.crew}/>
    </div>
  );
};

export default Details;
