import type { WatchlistItem } from "./types.ts";

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

/** The films still to watch, in the order they were added. */
export function unwatched(list: WatchlistItem[]): WatchlistItem[] {
  return list.filter((item) => !item.watched);
}

/** Returns watchlist of films specified by year */
export function byYear(list: WatchlistItem[], year: number) {
  return list.filter((item) => item.year == year);
}
