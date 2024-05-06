import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
});

export const movieByIdResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  overview: z.string(),
  vote_average: z.number(),
});

export const moviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema).default([]),
  total_pages: z.number(),
  total_results: z.number(),
});

export type TMoviesResponse = z.infer<typeof moviesResponseSchema>;
export type TMovie = z.infer<typeof movieSchema>;
export type TMovieById = z.infer<typeof movieByIdResponseSchema>;
