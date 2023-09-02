import React, { useEffect } from "react";
import "./home.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Upcoming from "./upcoming/Upcoming";
import TopRated from "./topRated/TopRated";
import { useDispatch } from "react-redux";
import { getButtonValue } from "../../store/slices/headerSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getButtonValue(null));
  }, []);
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Upcoming />
      <TopRated />
    </div>
  );
};

export default Home;
