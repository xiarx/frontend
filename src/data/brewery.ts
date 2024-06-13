import axios from "axios";

export interface GetBreweriesResponse {
  id: string;
  name: string;
  brewery_type: string
  address_1: string
  address_2: string
  address_3: string
  city: string
  state_province: string
  postal_code: string
  country: string
  longtitude: string
  lattitude: string
  phone: string
  website_url: string
  state: string
  street: string
}

export const getBreweries = () =>
  axios.get(`${process.env.BREWERY_URI}/breweries`);
