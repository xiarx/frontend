import { useQuery } from "@tanstack/react-query";
import { redirect } from "react-router-dom";

import { getMovies } from "@data/movies";
import { Path } from "@app/router";

import type { GetMoviesResponse } from "@data/movies";

const useMovies = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  if (isError) {
    redirect(Path.ERROR);
  }

  return {
    loading: isPending,
    data: data ? (data.data as GetMoviesResponse) : null,
  };
};

export default useMovies;
