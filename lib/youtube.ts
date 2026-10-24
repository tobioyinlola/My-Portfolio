export const PLACEHOLDER_ID = "PLACEHOLDER";

export const isPlaceholderVideo = (id: string): boolean => id === PLACEHOLDER_ID;

export const thumbUrl = (id: string, frame: "hq" | 1 | 2 | 3 = "hq"): string =>
  frame === "hq" ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : `https://i.ytimg.com/vi/${id}/${frame}.jpg`;

export const watchUrl = (id: string, start = 0): string => `https://www.youtube.com/watch?v=${id}${start ? `&t=${start}s` : ""}`;

export const embedUrl = (id: string, start = 0): string =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1${start ? `&start=${start}` : ""}`;
