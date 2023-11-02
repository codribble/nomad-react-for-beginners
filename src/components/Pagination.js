import React, { useEffect, useState } from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ setPage, current, total, limit }) {
  const [active, setActive] = useState(1);
  const pages = [];

  const changePage = (e) => {
    setPage(e.target.value);
  };

  for (let i = 0; i < limit; i++) {
    pages.push(i + 1);
  }

  useEffect(() => {
    setActive(current);
  }, [current]);

  // console.log(`pagination page: ${current}`);

  return (
    <>
      <div className={styles.paging}>
        {pages &&
          pages.map((num) => (
            <button
              key={num}
              onClick={changePage}
              value={num}
              className={`${styles.page} ${
                Number(active) === Number(num) && styles.current
              }`}
            >
              {num}
            </button>
          ))}
      </div>
    </>
  );
}
