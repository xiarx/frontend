import React from "react";
import { Box, Typography } from "@mui/material";

import type { FC } from "react";

import "./style";

const Error: FC = (): JSX.Element => {
  return (
    <Box
      id="error"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h4">Whoops! Something went wrong.</Typography>
    </Box>
  );
};

export default Error;
