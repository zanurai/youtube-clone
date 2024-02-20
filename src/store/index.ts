import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../Types";
import { getHomepageReduce } from "./reducers/getHomepageReduce";
import { getSearchVideos } from "./reducers/GetSearchVideo";
import { getRecommendedVideos } from "./reducers/getRecommendedVideo";
import { getVideoDetails } from "./reducers/getVideoDetails";


const initialState: InitialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: "",
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: [],
};

const YoutubeSlice = createSlice({
  name: "youtubeApp",
  initialState,
  reducers: {
    clearVideo: (state) => {
      state.videos = [];
      state.nextPageToken = null;
    },

    changeSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomepageReduce.fulfilled, (state, action) => {
      state.videos = action.payload.ParseData;
      state.nextPageToken = action.payload.nextPageToken;
    });

    builder.addCase(getSearchVideos.fulfilled, (state, action) => {
      state.videos = action.payload.ParseData;
      state.nextPageToken = action.payload.nextPageToken;
    });

    builder.addCase(getVideoDetails.fulfilled, (state, action) => {
      state.currentPlaying = action.payload;
    });

    builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
      state.recommendedVideos = action.payload.ParseData;
    });
  },
});

export const store = configureStore({
  reducer: {
    youtubeApp: YoutubeSlice.reducer,
  },
});

export const { clearVideo, changeSearchTerm, clearSearchTerm } =
  YoutubeSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
