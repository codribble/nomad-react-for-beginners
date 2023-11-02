import React, { useEffect, useState } from "react";
import styles from "./List.module.css";
import Movie from "../components/Movie";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";

export default function List() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(
    location.state.page ? location.state.page : 1
  );
  const [totalPage, setTotalPage] = useState(1);

  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=15929ba73ea97df7f30164465b7ea21f`
    );

    const json = await response.json();

    // console.log(json);

    setMovies(json.results);
    setTotalPage(json.total_pages);
  };

  useEffect(() => {
    getMovies();
  }, [page]);

  // console.log(`list page: ${page}`);

  return (
    <>
      <div className={styles.movieList}>
        {movies &&
          movies.map((movie) => (
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
        setPage={setPage}
        current={page}
        limit={5}
        total={totalPage}
      />
    </>
  );
}
