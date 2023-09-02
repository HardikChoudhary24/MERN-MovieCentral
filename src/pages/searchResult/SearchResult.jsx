import React, { useEffect, useState } from "react";
import "./searchresult.scss";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Card from "../../components/card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getPageNum } from "../../store/slices/searchSlice";
const SearchResult = () => {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState(null);
  const { query } = useParams();
  // const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();

  const {pageNum} = useSelector(state=>state.search)
  const fetchInitialData = async () => {
    setLoading(true);
    const res = await fetchDataFromApi(
      `/search/multi?query=${query}/&page=${pageNum}`
    );
    // console.log(res);
    setData(res);
    // setPageNum(pageNum + 1);
    dispatch(getPageNum(pageNum + 1));
    setLoading(false);
  };

  const fetchNextData = async () => {
    const res = await fetchDataFromApi(
      `/search/multi?query=${query}/&page=${pageNum}`
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
    fetchInitialData();
  }, [query]);

  console.log(data);
  return (
    <div className="searchResult">
      {!loading ? (
        data?.results?.length > 0 ? (
          <>
            <ContentWrapper>
              <div className="resultContainer">
                <p className="searchResultHeader">
                  {`Search ${
                    data?.total_results > 1 ? "results" : "result"
                  } for '${query}':`}
                </p>
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
                    return <Card item={item} />;
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

export default SearchResult;
// ?.results
