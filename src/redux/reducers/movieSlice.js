import { createSlice } from "@reduxjs/toolkit";
import { startTransition } from "react";

const movieSlice = createSlice({
  name:'movie',
  initialState:{
    popularMovies:[],
    topRatedMovies:[],
    upcomingMovies:[],
    genreMovies:[]
  },
  reducers:{
    // 외부에서 값을 가져온다고 하면 action도 정의를 해야됨
    initData:(state, action)=>{
      // console.log('[movieSlice.js]:',action);

      //구조분해를 통해 payload 속성값만 접근
      let {payload} = action;
      // console.log('[movieSlice.js]:',payload);
      console.log('[movieSlice.js]:',payload);

      //저장 여기서 state 는 initialState다.
      state.popularMovies = payload.popular.results
      state.topRatedMovies = payload.topRated.results
      state.upcomingMovies = payload.upcoming.results
      state.genreMovies = payload.genre.genres
    }
  }
})

export const MovieReducerActions = movieSlice.actions

export default movieSlice.reducer