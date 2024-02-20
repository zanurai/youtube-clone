import React from "react";
import { HomePageVideos } from "../Types";
import { Link } from "react-router-dom";

export default function Card({ data }: { data: HomePageVideos }) {
  return (
    <div className="w-64 h-64 flex gap-3 flex-col">
      <div className="relative">
        <span className="absolute bottom-3 right-3 text-sm bg-gray-900 px-2 py-0.5 z-10">
          {/* {data.videoDescription} */}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            className="h-44 w-72"
            alt="thumbnail"
          />
        </Link>
        <div className="flex gap-2 mt-5">
          <div className="min-w-fit">
            <a href="#">
              <img
                src={data.channelInfo.image}
                alt="channel"
                className="h-9 w-9 rounded-full"
              />
            </a>
          </div>
          <div>
            <h3>
              <a href="#" className="line-clamp-2">
                {data.videoTitle}
              </a>
            </h3>
            <div className="text-sm text-gray-400">
              <div>
                <a href="#" className="hover:text-white">
                  {data.channelInfo.name}
                </a>
              </div>
            </div>
            <div>
              <span className="after:content-['•'] after:max-1">
                {data.videoViews} views
              </span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
