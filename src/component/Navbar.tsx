import React from "react";
import { IoMenuOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { IoCamera } from "react-icons/io5";
import { IoAppsSharp } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { changeSearchTerm, clearSearchTerm, clearVideo } from "../store";
import { getSearchVideos } from "../store/reducers/GetSearchVideo";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  const handleSearch = () => {
    if (location.pathname !== "#") navigate("/search");
    else {
      dispatch(clearVideo());
      dispatch(getSearchVideos(false));
    }
  };

  return (
    <div className="flex justify-between items-center px-14 h-14 bg-[#212121] opacity-95 sticky top-0 z-50">
      <div className="flex gap-8 items-center text-2xl">
        <div>
          <IoMenuOutline />
        </div>
        <Link to="/">
          <div className="flex gap-1 items-center justify-center">
            <FaYoutube className="text-3xl text-red-600" />
            <span className="text-xl font-medium">YouTube</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className=""
        >
          <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0">
            <div className="flex gap-4 items-center pr-[-0.75rem]">
              <div>
                <IoSearchSharp className="text-xl" />
              </div>
              <input
                className="w-96 bg-zinc-900 focus:outline-none border-none"
                type="text"
                value={searchTerm}
                onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
              />
              {/* < className="h-10 w-16 flex items-center justify-center bg-zinc-800"/>*/}
              <IoClose
                className={`text-xl curser-pointer ${
                  !searchTerm ? "invisible" : "visible"
                }`}
                onClick={() => dispatch(clearSearchTerm())}
              />
              <button className="h-10 w-16 flex items-center justify-center bg-zinc-800">
                <div>
                  <IoSearchSharp className="text-xl" />
                </div>
              </button>
            </div>
          </div>
        </form>
        <div className="text-xl p-3 bg-zinc-900 rounded-full">
          <FaMicrophone />
        </div>
      </div>
      <div className="flex gap-5 items-center text-xl">
        <IoCamera />
        <IoAppsSharp />
        <div className="relative">
          <FaBell />
          <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
            9+
          </span>
        </div>
        <img
          src="./image/zanu.jpg"
          alt=""
          className="w-9 h-9 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
