import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
// import styles from "./Movie.module.css";

const Item = styled.div`
  position: relative;
  width: calc((100% - 30px * 4) / 5);
`;

const Poster = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${(props) => props.poster_path});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  aspect-ratio: 2/3;
`;

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 0.5);
  color: white;
  opacity: 0;
  transition: 0.3s ease;
  ${Item}:hover & {
    opacity: 1;
  }
`;

const Title = styled.h2`
  padding: 0 20px;
  font-weight: 700;
  font-size: 25px;
  text-align: center;
  transform: translateY(20px);
  opacity: 0;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0.1s;
  ${Item}:hover & {
    transform: translateX(0px);
    opacity: 1;
  }
`;

const Year = styled.p`
  margin-top: 15px;
  transform: translateY(20px);
  opacity: 0;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0.2s;
  ${Item}:hover & {
    transform: translateX(0px);
    opacity: 1;
  }
`;

const Rating = styled.p`
  margin-top: 5px;
  font-size: 14px;
  transform: translateY(20px);
  opacity: 0;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0.3s;
  ${Item}:hover & {
    transform: translateX(0px);
    opacity: 1;
  }
`;

const Star = styled.span`
  font-size: 16px;
  color: #ffc107;
`;

export default function Movie({ id, coverImg, title, release, rating, page }) {
  return (
    <Item>
      <Poster
        poster_path={coverImg && `https://image.tmdb.org/t/p/w300${coverImg}`}
      ></Poster>

      <Overlay>
        <Title>
          <Link
            to={`/movie/${id}`}
            state={{ page: page }}
            title="더보기"
          >
            {title}
          </Link>
        </Title>
        <Year>{release}</Year>
        <Rating>
          <Star>&#9733;</Star> {rating.toFixed(1)}
        </Rating>
      </Overlay>
    </Item>
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
