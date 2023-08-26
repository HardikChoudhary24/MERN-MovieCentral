import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/slices/homeSlice";
import {
  Footer,
  Header,
  Details,
  Explore,
  Home,
  SearchResult,
  PageNotFound,
} from "./utils/imports";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchImageUrl();
  }, []);

  const fetchImageUrl = async () => {
    const res = await fetchDataFromApi("/configuration");
    dispatch(getApiConfiguration({
      backdrop: res.images.base_url + "original",
      poster: res.images.base_url + "original",
      profile: res.images.base_url + "original",
    }));
  };
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
