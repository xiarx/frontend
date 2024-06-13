import React from "react";

import type { FC } from "react";
import type { RouteProps } from "react-router-dom";

import PageComponent from "@components/layout/page";
import MoviesComponent from "@components/pages/movies";

const Movies: FC<RouteProps> = (): JSX.Element => {
  return (
    <PageComponent>
      <MoviesComponent />
    </PageComponent>
  );
};

export default Movies;
