import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import List from "./routes/List";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/list/:page"
          element={<List />}
        />
        <Route
          path="/movie/:page/:id"
          element={<Detail />}
        />
      </Routes>
    </Router>
  );
}

export default App;
