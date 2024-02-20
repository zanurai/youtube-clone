import React from "react";

import axios from "axios";
import { YOUTUBE_API_URL } from "../../utils/Constant";
import { parseData } from "../../utils";
import { HomePageVideos } from "../../Types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getSearchVideos = createAsyncThunk(
  "youtubeApp/SearchVideos",
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFormState, videos, searchTerm },
    } = getState() as RootState;

    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFormState}` : ""
      }`
    );
    console.log("items;;", items);
    const ParseData: HomePageVideos[] = await parseData(items);
    return { ParseData: [...videos, ...ParseData], nextPageToken };
  }
);

export {};
