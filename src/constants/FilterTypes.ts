export const FILTER_TYPES = [
  'all', 
  'completed', 
  'active'
] as const;

export type Filter = typeof FILTER_TYPES[number];