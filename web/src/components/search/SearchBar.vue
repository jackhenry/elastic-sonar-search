<script setup lang="ts">
import { provide, ref, watch } from "vue";
import SearchInput from "./SearchInput.vue";
import { setSearchTermSymbol } from "./keys";
import { getSearchClient } from "../../search-client";
import { useSearchHitsStore } from "../../store";
import type { GroupedSearchHits } from "@elastic-sonar-search/api";

const searchClient = getSearchClient();
const { updateSearchHits } = useSearchHitsStore();

const searchQuery = ref("");

const setSearchTerm = (term: string) => {
  searchQuery.value = term;
};

watch(searchQuery, async () => {
  const groups = (await searchClient.search.query(
    searchQuery.value,
  )) as GroupedSearchHits;
  updateSearchHits(groups);
});

provide(setSearchTermSymbol, setSearchTerm);
</script>

<template>
  <SearchInput />
</template>
.
