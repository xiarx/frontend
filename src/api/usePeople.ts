import { useQueries } from "@tanstack/react-query";
import { redirect } from "react-router-dom";

import { getPerson } from "@app/data/people";
import { Path } from "@app/router";

const usePeople = (ids: number[]) => {
  const peopleQueries = useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: ["person", id],
        queryFn: () => getPerson(id),
      };
    }),
  });

  let loading = false;

  peopleQueries.forEach((query) => {
    if (query.isError) {
      redirect(Path.ERROR);
    }

    if (query.isPending) {
      loading = true;
    }
  });

  return { loading, data: peopleQueries };
};

export default usePeople;
