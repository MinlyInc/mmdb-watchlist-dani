import type { WatchlistItem, WatchlistStats } from "./types.ts";

/**
 * Adds a film to the watchlist.
 * A film already on the list is ignored, so adding twice is harmless.
 */
export function add(list: WatchlistItem[], item: WatchlistItem): WatchlistItem[] {
  if (list.some((existing) => existing.id === item.id)) {
    return list;
  }
  return [...list, item];
}

/** Removes a film from the watchlist. Removing something absent is harmless. */
export function remove(list: WatchlistItem[], id: number): WatchlistItem[] {
  return list.filter((item) => item.id !== id);
}

/** Marks a film as watched. */
export function markWatched(list: WatchlistItem[], id: number): WatchlistItem[] {
  return list.map((item) => (item.id === id ? { ...item, watched: true } : item));
}

/** The films still to watch, best rated first. */
export function unwatched(list: WatchlistItem[]): WatchlistItem[] {
  return list
    .filter((item) => !item.watched)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
}

/** Summarises a watchlist: how much is on it, how long it would take, how good it is. */
export function stats(data: WatchlistItem[]): WatchlistStats {
  let totalRuntime = 0;
  let totalRating = 0;
  let totalFilms = data.length;
  let watchedFilmsCount = data.filter((item) => item.watched).length;

  for (const item of data) {
    totalRuntime += item.runtimeMinutes ?? 0;
    totalRating += item.rating ?? 0;
  }

  console.log("stats() called with", totalFilms, "films");

  return {
    totalFilms: totalFilms,
    watchedFilmsCount: watchedFilmsCount,
    /** Calculates the number of unwatched films instead iterating over data array */
    unwatchedFilmsCount: totalFilms - watchedFilmsCount,
    totalRuntimeMinutes: totalRuntime,
    averageRating: totalRating / totalFilms,
  };
}

/** Returns watchlist of films specified by year */
export function byYear(list: WatchlistItem[], year: number) {
  return list.filter((item) => item.year == year);
}
