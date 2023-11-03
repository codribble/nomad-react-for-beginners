import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Detail from "./routes/Detail";
import List from "./routes/List";
import Home from "./routes/Home";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "list",
        element: <List />,
      },
      {
        path: "movie/:id",
        element: <Detail />,
      },
    ],
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset};

  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box
  }

  body {
    background-color: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .sound_only {
    overflow: hidden;
    display: inline;
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
  }
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
