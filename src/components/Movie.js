import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({ id, coverImg, title, year, rating }) {
  return (
    <div className={styles.item}>
      <div className={styles.thumbs}>
        <img
          src={coverImg}
          alt={title}
        />
      </div>
      <div className={styles.overlay}>
        <h2 className={styles.title}>
          <Link
            to={`/movie/${id}`}
            title="더보기"
          >
            {title}
          </Link>
        </h2>
        <p className={styles.year}>{year}</p>
        <p className={styles.rating}>
          <span>&#9733;</span> {rating}
        </p>
      </div>
    </div>
  );
}

Movie.protoTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
