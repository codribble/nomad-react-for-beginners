import React, { useEffect, useState } from "react";
// import styles from "./Home.module.css";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Loading = styled.strong`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100dvh;
  font-size: 50px;
`;

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            <Outlet />
          </>
        )}
      </div>
    </>
  );
}
