import React from "react";

import type { FC } from "react";
import type { RouteProps } from "react-router-dom";

import PageComponent from "@components/layout/page";
import ErrorComponent from "@components/pages/error";

const Error: FC<RouteProps> = (): JSX.Element => {
  return (
    <PageComponent>
      <ErrorComponent />
    </PageComponent>
  );
};

export default Error;
