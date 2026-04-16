import { useEffect, useState } from "react";
import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import MovieModal from "../MovieModal/MovieModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "../ReactPaginate/ReactPaginate";

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: ["film", query, page],
    queryFn: async () => await fetchMovies(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const handleSubmit = async (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const movies = data?.results ?? [];

  const totalPages = data?.total_pages ?? 0;

  useEffect(() => {
    if (data && data.results.length <= 0) {
      toast.error("No movies found for your request.");
    }
  }, [data]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {isFetching && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && isSuccess && (
        <MovieGrid
          onSelect={(movie) => setSelectedMovie(movie)}
          movies={movies}
        />
      )}
      {totalPages > 1 && (
        <ReactPaginate
          onChange={setPage}
          totalPages={totalPages}
          pageCount={page}
        />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      <Toaster />
    </>
  );
}
