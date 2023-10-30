import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    // const response = await fetch(
    //   `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    // );
    // const json = await response.json();
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    setMovie(json.data.movie);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <section>
      <div className="flex">
        <div className="left-cont">
          <img src={movie.large_cover_image} />
        </div>
        <div className="right-cont">
          <h1>{movie.title}</h1>
          <div className="movie-info">
            <dl>
              <dt>평점</dt>
              <dd>{movie.rating}</dd>
            </dl>
            <dl>
              <dt>장르</dt>
              <dd>
                {movie.genres.map((g) => (
                  <span key={g}>{g}</span>
                ))}
              </dd>
            </dl>
            <dl>
              <dt>상영시간</dt>
              <dd>{movie.runtime}</dd>
            </dl>
            <dl>
              <dt>개봉</dt>
              <dd>{movie.year}</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Detail;
