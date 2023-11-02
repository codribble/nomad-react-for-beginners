import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import List from "./List";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <strong className={styles.loading}>Loading...</strong>
        ) : (
          <>
            <h1 className={styles.title}>The Movies</h1>
            <List page={`1`} />
          </>
        )}
      </div>
    </>
  );
}
