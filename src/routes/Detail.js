import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styles from "./Detail.module.css";

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

    console.log(json);
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
      stars.push(
        <span
          key={i}
          className={styles.star}
        >
          &#9733;
        </span>
      );
    }

    return (
      <div className={styles.rating}>
        <div className={styles.stars}>
          <span className={styles.star}>&#9733;</span>
          <span className={styles.star}>&#9733;</span>
          <span className={styles.star}>&#9733;</span>
          <span className={styles.star}>&#9733;</span>
          <span className={styles.star}>&#9733;</span>
        </div>
        <div className={`${styles.stars} ${styles.fill}`}>
          {stars.map((star) => star)}
          {stars.length < 5 ? (
            <span
              className={`${styles.star} ${styles.clip}`}
              style={{ "--clip": `${(decimal * 100) / 10}%` }}
            >
              &#9733;
            </span>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? null : (
        <section className={styles.movie}>
          <div
            className={styles.visual}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
            }}
          >
            <div className={styles.popup}>
              <div className={styles.btnExit}>
                <Link
                  to={`/`}
                  state={{ page: page }}
                  title="목록"
                >
                  <span className={styles.soundOnly}>목록</span>
                </Link>
              </div>

              <div className={styles.info}>
                <div className={styles.poster}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>

                <div className={styles.d}>
                  <h1 className={styles.title}>{movie.title}</h1>

                  <div className={styles.details}>
                    <dl>
                      <dt className={styles.soundOnly}>평점</dt>
                      <dd className={styles.ratingWrap}>
                        <RatingStar />
                        <p>{movie.vote_average}</p>
                      </dd>
                    </dl>
                    <dl>
                      <dt className={styles.soundOnly}>개봉</dt>
                      <dd>{movie.release_date} 개봉</dd>
                    </dl>
                    <dl>
                      <dt className={styles.soundOnly}>상영시간</dt>
                      <dd>{movie.runtime}분</dd>
                    </dl>
                  </div>

                  <ul className={styles.genres}>
                    {movie.genres.map((g) => (
                      <li key={g.id}>{g.name}</li>
                    ))}
                  </ul>

                  {movie.overview !== "" ? (
                    <div className={styles.desc}>
                      <p>{movie.overview}</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
