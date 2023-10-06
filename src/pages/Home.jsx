import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../api'
import { useDispatch,useSelector } from 'react-redux'
import { MovieReducerActions } from '../redux/reducers/movieSlice'
import Banner from '../components/Banner'
import MovieSlide from '../components/MovieSlide'
import ClipLoader from "react-spinners/ClipLoader";


const Home = () => {

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const [loading, setLoading] = useState(false)

  // 스토어가 뭔지 물어보기
  // const popularMovies = useSelector(state=>state.movie.popularMovies)
  // const topRatedMovies = useSelector(state=>state.movie.topRatedMovies)
  // const upcomingMovies = useSelector(state=>state.movie.upcomingMovies)
  
  //위에 세줄 요약
  const {popularMovies,topRatedMovies,upcomingMovies} = useSelector((state)=>state.movie)

  const dispatch = useDispatch();

  const popularReq = async () => {
    let res = await api.get('/movie/popular?language=ko-KR&page=1')
    console.log(res.data);
  }
  const topRateReq = async () => {
    let res = await api.get('/movie/top_rated?language=ko-KR&page=1')
    console.log(res.data);
  }
  const upComingReq = async () => {
    let res = await api.get('/movie/upcoming?language=ko-KR&page=1')
    console.log(res.data);
  }
  const genreReq = async () => {
    let res = await api.get('/movie/list?language=ko')
    console.log(res.data);
  }

  // 3가지 종류의 영화목록을 묶어서 요청하는 방법
  const getMovieList = async () => {
    setLoading(true) // 데이터를 가져오기 전 
    const popularList = api.get('/movie/popular?language=ko-KR&page=1')
    const topRatedList = api.get('/movie/top_rated?language=ko-KR&page=1')
    const upcomingList = api.get('/movie/upcoming?language=ko-KR&page=1')
    const genreList = api.get('/genre/movie/list?language=ko')

    const [popular,topRated,upcoming,genre] = await Promise.all([popularList,topRatedList,upcomingList,genreList])

    setLoading(false)

    console.log(popular.data)
    console.log(topRated.data)
    console.log(upcoming.data)
    console.log(genre.data)

    dispatch(MovieReducerActions.initData({
      popular:popular.data, 
      topRated: topRated.data,
      upcoming: upcoming.data,
      genre:genre.data
    }))
  }

  useEffect(()=>{
    // popularReq()
    // topRateReq()
    // upComingReq()
    getMovieList()
  },[])
    

  //ture: 데이터를 가져오기 전
  //false: 데이터를 가져온 후

  return (
    <div>
      {loading ? 
             (<ClipLoader
             color='ffffff'
             loading={loading}
             cssOverride={override}
             size={150}
             aria-label="Loading Spinner"
             data-testid="loader"
           />)
      :
      <div>
        {/* {popularMovies && <Banner movie={popularMovies[0]}/>} */}
        <Banner movie={popularMovies[0]}/>
        <h1>인기있는 영화</h1>
        <MovieSlide movies={popularMovies}/>
        <h1>평점이 높은 영화</h1>
        <MovieSlide movies={topRatedMovies}/>
        <h1>개봉예정인 영화</h1>
        <MovieSlide movies={upcomingMovies}/>

      </div>
      }



    </div>
  )
}

export default Home