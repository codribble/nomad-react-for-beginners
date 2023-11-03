import { useEffect, useState } from "react";
import styled from "styled-components";
// import styles from "./Pagination.module.css";

const Paging = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px 0;
`;

const Button = styled.button`
  display: block;
  width: 30px;
  height: 30px;
  background-color: ${(props) => (props.active ? "#ffc107" : "transparent")};
  border: 0;
  border-radius: 3px;
  color: white;
  text-decoration: none;
  cursor: pointer;
`;

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
      <Paging>
        {pages &&
          pages.map((num) => (
            <Button
              key={num}
              onClick={changePage}
              value={num}
              active={Number(active) === Number(num)}
              /* className={`${styles.page} ${
                Number(active) === Number(num) && styles.current
              }`} */
            >
              {num}
            </Button>
          ))}
      </Paging>
    </>
  );
}
