import React from "react";
import { Box, Typography } from "@mui/material";

import type { FC } from "react";

import "./style";

const Header: FC = (): JSX.Element => {
  return (
    <Box id="header">
      <Typography variant="h3" component="h1" style={{ color: "#ffffff" }}>
        React Frontend
      </Typography>
      <Typography variant="h6" component="h2" style={{ color: "#f0f0f0" }}>
        Let entertainment be your assessment
      </Typography>
    </Box>
  );
};

export default Header;
