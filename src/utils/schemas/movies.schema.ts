import { z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  // backdrop_path: z.string(),
  // genre_ids: z.array(z.number()),
  // overview: z.string(),
  // adult: z.boolean(),
  // original_title: z.string(),
  // original_language: z.string(),
  // popularity: z.number(),
  // video: z.boolean(),
  // vote_average: z.number(),
  // vote_count: z.number(),
});

export const moviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema).default([]),
  total_pages: z.number(),
  total_results: z.number(),
});

export type TMoviesResponse = z.infer<typeof moviesResponseSchema>;
export type TMovie = z.infer<typeof movieSchema>;
