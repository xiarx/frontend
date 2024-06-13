import React from "react";
import { Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import type { FC } from "react";

import { Path } from "@app/router";

import "./style";

const Navigation: FC = (): JSX.Element => {
  const location = useLocation();

  return (
    <Box id="navigation" display="flex" flexDirection="row">
      <Link
        className={location.pathname === Path.INDEX ? "active" : undefined}
        to={Path.INDEX}
      >
        About
      </Link>
    <Link
      className={location.pathname === Path.BREWERY ? "active" : undefined}
      to={Path.BREWERY}
    >
      Brewery
    </Link>
      <Link
        className={location.pathname === Path.MOVIES ? "active" : undefined}
        to={Path.MOVIES}
      >
        Movies
      </Link>
      <Link
        className={location.pathname === Path.CAROUSEL ? "active" : undefined}
        to={Path.CAROUSEL}
      >
        Carousel
      </Link>
    </Box>
  );
};

export default Navigation;
