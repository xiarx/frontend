import React from "react";
import { Box, Typography, Button } from "@mui/material";

import type { FC } from "react";

import usePeople from "@api/usePeople";

import "./style";

export interface MovieData {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  data: MovieData;
}

const Movie: FC<Props> = (props): JSX.Element => {
  const { data } = usePeople(
    props.data.characters.map((url) => {
      const parts = url.slice(0, -1).split("/");

      return parseInt(parts[parts.length - 1]);
    }),
  );

  return (
    <Box
      id="movie"
      className={props.visible ? "visible" : undefined}
      onClick={(event) => props.onClose()}
    >
      <Box id="movie-container" onClick={(event) => event.stopPropagation()}>
        <div className="header">
          <Typography variant="h4" style={{ color: "white" }}>
            {props.data.title}
          </Typography>
        </div>
        <div className="content">
          <div className="info">
            <div className="meta">
              <Typography variant="h6">Director</Typography>
              <Typography variant="body1">{props.data.director}</Typography>
              <Typography variant="h6">Producer</Typography>
              <Typography variant="body1">{props.data.producer}</Typography>
              <Typography variant="h6">Release Date</Typography>
              <Typography variant="body1">
                {new Date(props.data.release_date).toLocaleDateString()}
              </Typography>
            </div>
            <div className="description">
              <Typography variant="h6">Description</Typography>
              <Typography variant="body1">
                {props.data.opening_crawl}
              </Typography>
            </div>
          </div>
          <div className="characters">
            <Typography variant="h6">Characters</Typography>
            {data?.map(
              (query, index) =>
                !query.isPending && (
                  <div key={index} className="character">
                    <Typography variant="h6">{query.data.data.name}</Typography>
                    <Typography variant="subtitle2">Birth Year</Typography>
                    <Typography variant="body2">
                      {query.data.data.birth_year}
                    </Typography>
                    <Typography variant="subtitle2">Gender</Typography>
                    <Typography variant="body2">
                      {query.data.data.gender}
                    </Typography>
                  </div>
                ),
            )}
          </div>
        </div>
        <Button
          color="inherit"
          variant="outlined"
          onClick={() => props.onClose()}
        >
          X
        </Button>
      </Box>
    </Box>
  );
};

export default Movie;
