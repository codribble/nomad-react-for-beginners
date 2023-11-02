import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../routes/Home";
import Detail from "../routes/Detail";
import List from "../routes/List";

function AppRouter() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          exact
          path="/"
          element={<Home />}
        />
        <Route
          exact
          path="/list"
          element={<List />}
        />
        <Route
          exact
          path="/movie/:id"
          element={<Detail />}
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
