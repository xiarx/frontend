import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Index from "@routes/index";
import Brewery from "@routes/brewery";
import Movies from "@routes/movies";
import Carousel from "@routes/carousel";
import Error from "@routes/error";

export enum Path {
  INDEX = "/",
  BREWERY = "/brewery",
  MOVIES = "/movies",
  CAROUSEL = "/carousel",
  ERROR = "/error",
}

const router = createBrowserRouter([
  {
    path: Path.INDEX,
    element: <Index />,
  },
  {
    path: Path.BREWERY,
    element: <Brewery />,
  },
  {
    path: Path.MOVIES,
    element: <Movies />,
  },
  {
    path: Path.CAROUSEL,
    element: <Carousel />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
