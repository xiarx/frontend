import React from "react";
import { Container, Box } from "@mui/material";

import type { FC, ReactNode } from "react";

import Header from "@components/layout/header";
import Navigation from "@components/layout/navigation";

import "./style";

interface Props {
  children: ReactNode;
}

const Page: FC<Props> = ({ children }: Props): JSX.Element => {
  return (
    <Container id="page" maxWidth={false} disableGutters={true}>
      <Header />
      <Navigation />
      <Box id="content">{children}</Box>
    </Container>
  );
};

export default Page;
