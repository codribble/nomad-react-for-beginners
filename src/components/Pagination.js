import { Link } from "react-router-dom";
import styles from "./Pagination.module.css";
import { useEffect, useState } from "react";

function Pagination({ current, total }) {
  const [pageActive, setPageActive] = useState("");
  const pages = [];

  useEffect(() => {
    setPageActive(current);
  }, []);

  for (let i = 0; i < 10; i++) {
    pages.push(
      <div
        key={i}
        className={`${styles.page} ${current === i + 1 ? "current" : ""}`}
      >
        <Link to={`/list/${i + 1}`}>{i + 1}</Link>
      </div>
    );
  }

  return (
    <>
      <div className={styles.paging}>{pages.map((p) => p)}</div>
    </>
  );
}

export default Pagination;
