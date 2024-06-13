import React from "react";
import { Box, Typography } from "@mui/material";

import type { FC } from "react";

import Flower from "@assets/images/flower.jpg";

import "./style";

const Index: FC = (): JSX.Element => {
  return (
    <Box id="index" display="flex">
      <Typography variant="h2">A page of peace.</Typography>
      <Typography variant="h6">It&apos;s a peaceful page.</Typography>
      <img src={Flower} />
    </Box>
  );
};

export default Index;
