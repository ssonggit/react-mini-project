import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  // console.log('qwe', movie);

  const { genreMovies } = useSelector((state) => state.movie);
  // console.log("genreMovies", genreMovies);

  const div_styled = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${movie.poster_path})`,
    width: "300px",
    height: "200px",
  };
  return (
    // <div >
    //   <img src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`} alt="이미지" style={{width:'100%', height:'100%', padding:'10px'}}/>
    // </div>
    <div style={div_styled} className="movie-card">
      <Link to={`/movies/${movie.id}`}>
        <div className="overlay">
          <h1>{movie.title}</h1>
          <div className="genres">
            {movie.genre_ids.map((id) => (
              <Badge bg="danger" key={id}>
                {/* 
              배열명.find((매개변수) => 조건식)
              find() : 일치한 정보들 중 첫번째 요소만 반환하는 함수
              */}
                {genreMovies.find((item) => item.id === id).name}
              </Badge>
            ))}
          </div>
          <div className="info">
            <span>{`평점:${movie.vote_average}`}</span>
            <span>|</span>
            <span>{movie.adult ? "청불" : "청소년관람"}</span>
          </div>
          <div></div>
        </div>
      </Link>
    </div>
  );
};
export default MovieCard;
