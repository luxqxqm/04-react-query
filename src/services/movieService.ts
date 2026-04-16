import axios from "axios";

import type { Movie } from "../types/movie";

interface FetchMoviesProps {
  results: Movie[],
  total_pages:number
}

export default async function fetchMovies(query: string, page:number):Promise<FetchMoviesProps> {
    
    const url =
    "https://api.themoviedb.org/3/search/movie";
  const options = {
    params: {
      query: query,
      page:page
    },
    headers: {
      Authorization:
        `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
    };
    
    const response = await axios.get<FetchMoviesProps>(url, options);
    
    return response.data;
}