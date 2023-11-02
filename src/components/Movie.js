import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

export default function Movie({ id, coverImg, title, year, rating, page }) {
  return (
    <div className={styles.item}>
      <div className={styles.thumbs}>
        <img
          src={`https://image.tmdb.org/t/p/w500${coverImg}`}
          alt={title}
        />
      </div>
      <div className={styles.overlay}>
        <h2 className={styles.title}>
          <Link
            to={`/movie/${id}`}
            state={{ page: page }}
            title="더보기"
          >
            {title}
          </Link>
        </h2>
        <p className={styles.year}>{year}</p>
        <p className={styles.rating}>
          <span>&#9733;</span> {rating.toFixed(1)}
        </p>
      </div>
    </div>
  );
}

Movie.protoTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};
