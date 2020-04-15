export type PartialBy<T, K extends string> = Partial<T> & Omit<T, K>;
