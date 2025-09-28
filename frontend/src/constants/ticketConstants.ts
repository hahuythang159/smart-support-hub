export const STATUS_OPTIONS = ['open', 'closed', 'resolved', 'pending'] as const;
export type StatusType = (typeof STATUS_OPTIONS)[number];

export const PRIORITY_OPTIONS = ['low', 'medium', 'high'] as const;
export type PriorityType = (typeof PRIORITY_OPTIONS)[number];
