import { useState } from "react";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);

  // setLoading(false);

  return (
    <div>
      {loading ? (
        <strong className={styles.loading}>Loading...</strong>
      ) : (
        <>
          <h1 className={styles.title}>The Movies</h1>
        </>
      )}
    </div>
  );
}

export default Home;
