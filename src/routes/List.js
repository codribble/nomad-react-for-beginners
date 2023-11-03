import React, { useEffect, useState } from "react";
// import styles from "./List.module.css";
import Movie from "../components/Movie";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
`;

const Movies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
`;

export default function List() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
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
    if (location.state !== null && location.state.page)
      setPage(location.state.page);
  }, []);

  useEffect(() => {
    getMovies();
    setLoading(false);
  }, [page]);

  // console.log(`list page: ${page}`);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Container>
            <Movies>
              {movies &&
                movies.map((movie) => (
                  <Movie
                    key={movie.id}
                    id={movie.id}
                    release={movie.release_date}
                    coverImg={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    page={page}
                  />
                ))}
            </Movies>

            <Pagination
              setPage={setPage}
              current={page}
              limit={5}
              total={totalPage}
            />
          </Container>
        </>
      )}
    </>
  );
}
