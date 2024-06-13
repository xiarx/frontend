import axios from "axios";

export interface GetMoviesResponse {
  count: number;
  next?: string;
  previous?: string;
  results: {
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
  }[];
}

export const getMovies = () => axios.get(`${process.env.SWAPI_URI}/api/films`);
