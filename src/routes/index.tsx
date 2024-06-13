import React from "react";

import type { FC } from "react";
import type { RouteProps } from "react-router-dom";

import PageComponent from "@components/layout/page";
import IndexComponent from "@components/pages/index";

const Index: FC<RouteProps> = (): JSX.Element => {
  return (
    <PageComponent>
      <IndexComponent />
    </PageComponent>
  );
};

export default Index;
