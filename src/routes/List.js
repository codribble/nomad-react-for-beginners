import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./List.module.css";
import Movie from "../components/Movie";
import Pagination from "../components/Pagination";

function List() {
  const { page } = useParams();
  const [movies, setMovies] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=15929ba73ea97df7f30164465b7ea21f`
    );

    const json = await response.json();

    // console.log(json.results);

    setMovies(json.results);
    setTotalPage(json.total_pages);
  };

  useEffect(() => {
    getMovies();
  }, [movies]);

  return (
    <>
      <div className={styles.movieList}>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            year={movie.release_date}
            coverImg={movie.poster_path}
            title={movie.title}
            rating={movie.vote_average}
            page={page}
          />
        ))}
      </div>

      <Pagination
        current={page}
        total={totalPage}
      />
    </>
  );
}

export default List;
