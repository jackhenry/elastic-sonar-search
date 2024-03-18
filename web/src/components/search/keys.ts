import type { InjectionKey } from "vue";

export const setSearchTermSymbol = Symbol() as InjectionKey<
  (term: string) => void
>;
