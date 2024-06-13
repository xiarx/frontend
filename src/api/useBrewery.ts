import { useQuery } from "@tanstack/react-query";
import { redirect } from "react-router-dom";

import { getBreweries } from "@data/brewery";
import { Path } from "@app/router";

import type { GetBreweriesResponse } from "@data/brewery";

const useBrewery = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ["breweries"],
    queryFn: getBreweries,
  });

  if (isError) {
    redirect(Path.ERROR);
  }

  return {
    loading: isPending,
    data: data ? (data.data as GetBreweriesResponse[]) : null,
  };
};

export default useBrewery;
