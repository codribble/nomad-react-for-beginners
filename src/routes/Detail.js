import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const getMovie = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );

    const json = await response.json();
    // const json = await (
    //   await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    // ).json();

    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  // console.log(movie);

  const RatingStar = () => {
    const rating = (movie.rating / 2).toFixed(1);
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
          <span
            className={`${styles.star} ${styles.clip}`}
            style={{ "--clip": `${(decimal * 100) / 10}%` }}
          >
            &#9733;
          </span>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? null : (
        <section className={styles.movie}>
          <div className={styles.btnExit}>
            <Link
              to="/"
              title="목록"
            >
              <span className={styles.soundOnly}>목록</span>
            </Link>
          </div>

          <div
            className={styles.visual}
            style={{ backgroundImage: `url(${movie.background_image})` }}
          >
            <div className={styles.info}>
              <h1 className={styles.title}>{movie.title}</h1>

              <div className={styles.details}>
                <dl>
                  <dt className={styles.soundOnly}>평점</dt>
                  <dd className={styles.ratingWrap}>
                    <RatingStar />
                    <p>{movie.rating}</p>
                  </dd>
                </dl>
                <dl>
                  <dt className={styles.soundOnly}>개봉</dt>
                  <dd>{movie.year}년 개봉</dd>
                </dl>
                <dl>
                  <dt className={styles.soundOnly}>상영시간</dt>
                  <dd>{movie.runtime}분</dd>
                </dl>
              </div>

              <ul className={styles.genres}>
                {movie.genres.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>

              {movie.description_full !== "" ? (
                <div className={styles.desc}>
                  <p>{movie.description_full}</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Detail;
