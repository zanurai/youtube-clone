import React, { useEffect } from "react";
import Navbar from "../component/Navbar";
import { Sidebar } from "../component/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getHomepageReduce } from "../store/reducers/getHomepageReduce";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "../component/Spinner";
import { HomePageVideos } from "../Types";
import Card from "../component/Card";
import { clearVideo } from "../store";

export const Home = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  useEffect(() => {
    dispatch(getHomepageReduce(false));
    console.log("video;;", videos);
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearVideo());
    };
  }, [dispatch]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomepageReduce(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
              {videos.map((item: HomePageVideos) => (
                <Card data={item} key={item.videoId} />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};
