import React from "react";

import type { FC } from "react";
import type { RouteProps } from "react-router-dom";

import PageComponent from "@components/layout/page";
import BreweryComponent from "@components/pages/brewery";

const Brewery: FC<RouteProps> = (): JSX.Element => {
  return (
    <PageComponent>
      <BreweryComponent />
    </PageComponent>
  );
};

export default Brewery;
