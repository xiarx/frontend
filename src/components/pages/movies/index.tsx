import React, { useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Button,
  CircularProgress,
} from "@mui/material";

import type { FC } from "react";

import useMovies from "@api/useMovies";
import MovieModule from "@components/modules/movie";

import type { MovieData } from "@components/modules/movie";

import "./style";

const Movies: FC = (): JSX.Element => {
  const [orderBy, setOrderBy] = useState<"title" | "date">("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [movieVisible, setMovieVisible] = useState(false);
  const [movieData, setMovieData] = useState<MovieData>();
  const { loading, data } = useMovies();

  if (!loading) {
    if (orderBy === "title") {
      data.results.sort((x, y) => {
        if (x.title > y.title) return order === "asc" ? -1 : 1;
        if (x.title < y.title) return order === "asc" ? 1 : -1;

        return 0;
      });
    }

    if (orderBy === "date") {
      data.results.sort((x, y) => {
        if (new Date(x.release_date) > new Date(y.release_date))
          return order === "asc" ? -1 : 1;
        if (new Date(x.release_date) < new Date(y.release_date))
          return order === "asc" ? 1 : -1;

        return 0;
      });
    }
  }

  return (
    <>
      {loading && (
        <Box
          id="movies"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      {!loading && (
        <Box id="movies" display="flex" justifyContent="center">
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sortDirection={orderBy === "title" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "title"}
                        direction={order}
                        onClick={() => {
                          setOrder(
                            orderBy === "title"
                              ? order === "asc"
                                ? "desc"
                                : "asc"
                              : "asc",
                          );
                          setOrderBy("title");
                        }}
                      >
                        Title
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Director</TableCell>
                    <TableCell>Producer</TableCell>
                    <TableCell
                      sortDirection={orderBy === "date" ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === "date"}
                        direction={order}
                        onClick={() => {
                          setOrder(
                            orderBy === "date"
                              ? order === "asc"
                                ? "desc"
                                : "asc"
                              : "asc",
                          );
                          setOrderBy("date");
                        }}
                      >
                        Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">Characters</TableCell>
                    <TableCell align="right">Planets</TableCell>
                    <TableCell align="right">Starships</TableCell>
                    <TableCell align="right">Vehicles</TableCell>
                    <TableCell align="right">Species</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.results.map((movie, index) => (
                    <TableRow key={index}>
                      <TableCell>{movie.title}</TableCell>
                      <TableCell>{movie.director}</TableCell>
                      <TableCell>{movie.producer}</TableCell>
                      <TableCell>{movie.release_date}</TableCell>
                      <TableCell align="right">
                        {movie.characters.length}
                      </TableCell>
                      <TableCell align="right">
                        {movie.planets.length}
                      </TableCell>
                      <TableCell align="right">
                        {movie.starships.length}
                      </TableCell>
                      <TableCell align="right">
                        {movie.vehicles.length}
                      </TableCell>
                      <TableCell align="right">
                        {movie.species.length}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => {
                            setMovieData(movie);
                            setMovieVisible(true);
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {movieData && (
              <MovieModule
                visible={movieVisible}
                onClose={() => setMovieVisible(false)}
                data={movieData}
              />
            )}
          </>
        </Box>
      )}
    </>
  );
};

export default Movies;
