import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
    );

    const json = await response.json();

    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <strong className={styles.loading}>Loading...</strong>
      ) : (
        <>
          <h1 className={styles.title}>The Movies</h1>

          <div className={styles.movieList}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                coverImg={movie.large_cover_image}
                title={movie.title}
                rating={movie.rating}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
