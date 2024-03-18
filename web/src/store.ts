import { defineStore } from "pinia";
import type { GroupedSearchHits, SearchHit } from "@elastic-sonar-search/api";
import { ref } from "vue";

export const useSearchHitsStore = defineStore("searchHits", () => {
  const searchHits = ref<SearchHit[] | undefined>(undefined);
  const groupedSearchHits = ref<GroupedSearchHits>({});
  function updateSearchHits(groups: GroupedSearchHits) {
    groupedSearchHits.value = groups;
  }

  return { searchHits, groupedSearchHits, updateSearchHits };
});
