export const searchTypes = ["groups", "specifications"] as const;
export type SearchType = (typeof searchTypes)[number];

export const ALL_SPECIFICATIONS_GROUP = {
  id: null,
  name: "All",
} as const;
