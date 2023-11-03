import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
// import styles from "./Detail.module.css";

const Movie = styled.section`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100dvh;
  background-image: url(${(props) => props.bgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 0.5);
    backdrop-filter: blur(5px);
  }
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 20%;
  width: 60%;
  max-height: calc(100% - 100px);
  padding: 0 30px;
  text-align: center;
  transform: translateY(-50%);
`;

const Exit = styled.div`
  margin-bottom: 30px;
  & a {
    position: relative;
    display: block;
    width: 30px;
    height: 30px;
    margin: 0 auto;
    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 2px;
      margin-top: -1px;
      background-color: white;
      transform: translateX(-50%) rotate(45deg);
    }
    &::after {
      transform: translateX(-50%) rotate(-45deg);
    }
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const Poster = styled.div`
  width: 500px;
  background-image: url(${(props) => props.posterUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  aspect-ratio: 2/3;
`;

const Title = styled.h1`
  font-size: 30px;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  & dl {
    display: flex;
    gap: 10px;
  }
`;

const RatingWrap = styled.dd`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Rating = styled.div`
  position: relative;
  & .stars {
    display: flex;
    color: #eee;
    $ span {
      overflow: hidden;
      display: block;
      width: 16px;
      line-height: 1;
    }
  }
  & .fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: #ffc107;
    & .clip {
      clip-path: polygon(0% 0%, var(--clip) 0%, var(--clip) 100%, 0% 100%);
    }
  }
`;

const Genres = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
  & li {
    padding: 3px 5px;
    background-color: #ffc107;
    border-radius: 3px;
    font-weight: 500;
    color: black;
    line-height: 1;
  }
`;

const Description = styled.div`
  overflow: hidden;
  overflow-y: auto;
  width: 100%;
  max-width: 768px;
  max-height: 500px;
  margin: 50px auto 0;
  text-align: left;
  line-height: 1.6;
`;

export default function Detail() {
  const { id } = useParams();
  const location = useLocation();
  const page = location.state.page;
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=15929ba73ea97df7f30164465b7ea21f`
    );

    const json = await response.json();

    // console.log(json);
    // console.log(location);

    setMovie(json);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  // console.log(movie);

  const RatingStar = () => {
    const rating = (movie.vote_average / 2).toFixed(1);
    const integer = "" + rating.toString().split(".")[0];
    const decimal =
      "" + rating.toString().split(".")[1]
        ? rating.toString().split(".")[1]
        : 0;
    let stars = [];

    for (let i = 0; i < integer; i++) {
      stars.push(<span key={i}>&#9733;</span>);
    }

    return (
      <Rating>
        <div className="stars">
          <span>&#9733;</span>
          <span>&#9733;</span>
          <span>&#9733;</span>
          <span>&#9733;</span>
          <span>&#9733;</span>
        </div>
        <div className="stars fill">
          {stars.map((star) => star)}
          {stars.length < 5 ? (
            <span
              className="clip"
              style={{ "--clip": `${(decimal * 100) / 10}%` }}
            >
              &#9733;
            </span>
          ) : null}
        </div>
      </Rating>
    );
  };

  return (
    <>
      {loading ? null : (
        <Movie bgUrl={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}>
          <Popup>
            <Exit>
              <Link
                to={`/list`}
                state={{ page: page }}
                title="목록"
              >
                <span className="sound_only">목록</span>
              </Link>
            </Exit>

            <Info>
              <Poster
                posterUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              ></Poster>
              <div>
                <Title>{movie.title}</Title>

                <Details>
                  <dl>
                    <dt className="sound_only">평점</dt>
                    <RatingWrap>
                      <RatingStar />
                      <p>{movie.vote_average}</p>
                    </RatingWrap>
                  </dl>
                  <dl>
                    <dt className="sound_only">개봉</dt>
                    <dd>{movie.release_date} 개봉</dd>
                  </dl>
                  <dl>
                    <dt className="sound_only">상영시간</dt>
                    <dd>{movie.runtime}분</dd>
                  </dl>
                </Details>

                <Genres>
                  {movie.genres.map((g) => (
                    <li key={g.id}>{g.name}</li>
                  ))}
                </Genres>

                {movie.overview !== "" ? (
                  <Description>
                    <p>{movie.overview}</p>
                  </Description>
                ) : null}
              </div>
            </Info>
          </Popup>
        </Movie>
      )}
    </>
  );
}
