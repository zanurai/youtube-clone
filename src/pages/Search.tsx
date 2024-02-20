import React, { useEffect } from "react";
import Navbar from "../component/Navbar";
import { Sidebar } from "../component/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "../component/Spinner";
import { HomePageVideos } from "../Types";
import { clearVideo } from "../store";
import { useNavigate } from "react-router-dom";
import { getSearchVideos } from "../store/reducers/GetSearchVideo";
import SearchCard from "../component/SearchCard";

export const Search = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  useEffect(() => {
    dispatch(clearVideo());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchVideos(false));
    }
    console.log("video;;", videos);
  }, [dispatch, navigate, searchTerm]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos.length ? (
          <div className="py-8 pl-8 flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              height={600}
            >
              {videos.map((item: HomePageVideos) => (
                <div className="my-5">
                  <SearchCard data={item} key={item.videoId} />
                </div>
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
