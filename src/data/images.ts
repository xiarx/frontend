import axios from "axios";

export interface GetImagesByTopicResponse {
  id: string;
  slug: string;
  links: {
    html: string;
    self: string;
    download: string;
  };
}

export const getImagesByTopic = (token: string, topic: string) =>
  axios.get(`${process.env.UNSPLASH_URI}/topics/${topic}/photos`, {
    headers: {
      Authorization: `Client-ID ${token}`,
    },
  });
