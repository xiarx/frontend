import React from "react";

import type { FC } from "react";
import type { RouteProps } from "react-router-dom";

import PageComponent from "@components/layout/page";
import CarouselComponent from "@components/pages/carousel";

const Carousel: FC<RouteProps> = (): JSX.Element => {
  return (
    <PageComponent>
      <CarouselComponent />
    </PageComponent>
  );
};

export default Carousel;
