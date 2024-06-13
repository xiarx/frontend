import axios from "axios";

export interface GetTopicsResponse {
  id: string;
  slug: string;
  title: string;
}

export const getTopics = (token: string) =>
  axios.get(`${process.env.UNSPLASH_URI}/topics`, {
    headers: {
      Authorization: `Client-ID ${token}`,
    },
  });
