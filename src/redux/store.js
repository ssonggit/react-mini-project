import React from 'react'
import {configureStore} from '@reduxjs/toolkit'
import movieReducer from './reducers/movieSlice'


export default configureStore({
  reducer:{
    movie:movieReducer
  }
})