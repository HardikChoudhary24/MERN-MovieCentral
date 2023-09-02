import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import Img from "../../../components/image/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { getPageNum } from "../../../store/slices/searchSlice";


const HeroBanner = () => {
  const [backgroundImg, setBackgroundImg] = useState("");
  const [inputField, setInputField] = useState("");
  const navigate = useNavigate();
  const { data, isLoading, isError } = useFetch("/movie/upcoming");
  const { url } = useSelector((state) => state.home);
  const dispatch =useDispatch();
  
  useEffect(() => {
    const bgUrl =
      url.backdrop+data?.results[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackgroundImg(bgUrl);
  }, [data]);

  const searchQuery = (e) => {
    if (e.key === "Enter" && inputField !== "") {
      dispatch(getPageNum(1));
      navigate(`/MERN-MovieCentral/search/${inputField}`);
    }
  };
  const searchQueryViaBtn = () => {
    if ( inputField !== "") {
      dispatch(getPageNum(1));
      navigate(`/MERN-MovieCentral/search/${inputField}`);
    }
  };

  return (
    <div className="heroBanner">
      {!isLoading && (
        <div className="bannerImg">
          <Img src={backgroundImg} className={"backdropImg"} />
        </div>
      )}
      <div className="layer"></div>
      <ContentWrapper>
        <div className="bannerContent">
          <p className="title">Welcome.</p>
          <p className="subHeading">
            Explore a universe of entertainment with countless Movies & TV
            shows!
          </p>
          <div className="searchBar">
            <input
              type="text"
              placeholder="Search for a movie or a tv show..."
              value={inputField}
              onChange={(e) => setInputField(e.target.value)}
              onKeyDown={searchQuery}
              className="searchInput"
            />
            <button className="searchBtn" onClick={searchQueryViaBtn}>
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
