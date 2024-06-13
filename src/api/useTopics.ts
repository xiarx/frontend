import { useQuery } from "@tanstack/react-query";
import { redirect } from "react-router-dom";

import { useAuthContext } from "@context/auth";
import { getTopics } from "@data/topics";
import { Path } from "@app/router";

import type { GetTopicsResponse } from "@data/topics";

const useTopics = () => {
  const { token } = useAuthContext();
  const { isPending, isError, data } = useQuery({
    queryKey: ["topics"],
    queryFn: () => getTopics(token),
  });

  if (isError) {
    redirect(Path.ERROR);
  }

  return {
    loading: isPending,
    data: data ? (data.data as GetTopicsResponse[]) : null,
  };
};

export default useTopics;
