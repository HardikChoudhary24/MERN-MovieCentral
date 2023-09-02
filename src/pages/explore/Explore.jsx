import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Card from "../../components/card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getPageNum } from "../../store/slices/searchSlice";
import "./explore.scss";

let filters = {};
const sortbyData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];
const Explore = () => {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  const [sortby, setSortby] = useState(null);
  const { mediaType } = useParams();
  // const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const { pageNum } = useSelector((state) => state.search);

  const fetchInitialData = async () => {
    setLoading(true);
    const res = await fetchDataFromApi(`/discover/${mediaType}`, filters);
    // console.log(res);
    setData(res);
    // setPageNum(pageNum + 1);
    dispatch(getPageNum(pageNum + 1));
    setLoading(false);
  };

  const fetchNextData = async () => {
    console.log(filters);
    const res = await fetchDataFromApi(
      `/discover/${mediaType}?page=${pageNum}`,
      filters
    );
    if (data?.results) {
      setData({ ...data, results: [...data?.results, ...res?.results] });
    } else {
      setData(res);
    }
    // setPageNum(pageNum + 1);
    dispatch(getPageNum(pageNum + 1));
    // console.log(data);
  };

  useEffect(() => {
    filters = {};
    setData(null);
    setSortby(null);
    fetchInitialData();
  }, [mediaType]);

  console.log(data);

  const setFilters = (e) => {
    setSortby(e.target.value);
    filters.sort_by = e.target.value;
    console.log(filters);
    dispatch(getPageNum(1));
    fetchInitialData();
  };
  return (
    <div className="searchResult">
      {!loading ? (
        data?.results?.length > 0 ? (
          <>
            <ContentWrapper>
              <div className="resultContainer">
                <div className="exploreHead">
                  <p className="searchResultHeader exploreResultHeader">
                    {mediaType === "tv" ? "TV Shows" : "Movies"}
                  </p>
                  <div className="countrySelect">
                    <select value={sortby} onChange={(e) => setFilters(e)}>
                      <option value={undefined}>Sort by</option>
                      {sortbyData?.map((c) => {
                        return (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <InfiniteScroll
                  className="resultItems"
                  dataLength={data?.results?.length || []}
                  next={fetchNextData}
                  hasMore={pageNum <= data?.total_pages}
                  loader={
                    <div className="loaderBox">
                      <CircularProgress style={{ color: "#e01e25" }} />
                    </div>
                  }
                >
                  {data?.results?.map((item) => {
                    if (item.vote_average !== 0) {
                      return <Card item={item} mediaType={mediaType} />;
                    }
                  })}
                </InfiniteScroll>
              </div>
            </ContentWrapper>
          </>
        ) : (
          <ContentWrapper>
            <div className="resultContainer">
              <p className="searchResultHeader">Sorry, No Results Found!</p>
            </div>
          </ContentWrapper>
        )
      ) : (
        <div className="loaderBox">
          <CircularProgress style={{ color: "#e01e25" }} />
        </div>
      )}
    </div>
  );
};

export default Explore;
