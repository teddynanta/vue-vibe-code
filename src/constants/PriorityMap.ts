export const PRIORITY_MAP: Record<'high' | 'medium' | 'low', number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export const PRIORITY_OPTIONS = [
  'high',
  'medium',
  'low',
] as const;

export type Priority = typeof PRIORITY_OPTIONS[number];