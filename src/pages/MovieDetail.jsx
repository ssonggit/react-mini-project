import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "react-bootstrap";
import api from "../api";

// /movies/1 -> useParams()
// /movies?id=1 -> useSearchParams()

const MovieDetail = () => {
  const { id } = useParams();
  // console.log('[MovieDeatail.js]:',id);

  const [movieDeatail, setMovieDeatail] = useState(null);
  const [reviews, setReviews] = useState([]);

  const getMovieDetail = async () => {
    let res = await api.get(`/movie/${id}?language=ko`);
    console.log("[MovieDetail.js]", res.data);
    setMovieDeatail(res.data);
  };

  const getReviews = async () => {
    let res = await api.get(`/movie/${id}/reviews?language=en-US&page=1`);
    console.log('리뷰데이터',res.data);
    setReviews(res.data.results);
  };

  useEffect(() => {
    getMovieDetail();
    getReviews();
  }, []);

  return (
    <div>
      {movieDeatail ? (
        <div className="container movie-details">
          <div className="poster">
            <img
              src={`https://www.themoviedb.org/t/p/original${movieDeatail.poster_path}`}
              alt="포스터"
            />
          </div>
          <div className="info">
            <div className="genre">
              {movieDeatail.genres.map((item) => (
                <Badge bg="danger" key={item.id}>
                  {item.name}
                </Badge>
              ))}
            </div>
            <h1>{movieDeatail.title}</h1>
            <h4>{movieDeatail.tagline}</h4>
            <div>
              <span>{movieDeatail.release_data}</span>
              <span>{movieDeatail.runtime}분</span>
              <span>평점 : {movieDeatail.vote_average} 점</span>
              <span>{movieDeatail.adult ? "청불" : "18세 미만"}</span>
            </div>
            <div className="overview">
            {movieDeatail.overview}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* 리뷰영역 */}
      <div className="container review-box">
        {reviews.map((item) => (
          <div className="review-item" key={item.id}>
            <h4>{item.author}</h4>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetail;
