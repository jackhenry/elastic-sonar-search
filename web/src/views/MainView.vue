<script setup lang="ts">
import SearchResults from "../components/search/SearchResults.vue";
import SearchBar from "../components/search/SearchBar.vue";
</script>

<template>
  <div class="text-sonar-fg-light bg-sonar-offwhite min-h-screen">
    <SearchBar
      class="absolute top-0 left-1/2 -translate-x-1/2 max-w-[1200px] z-10 bg-sonar-offwhite"
    />
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 max-w-[1200px] w-full h-[100vh] overflow-y-auto"
    >
      <div class="sm:columns-2 lg:columns-3 pt-[80px] pb-4 bg-sonar-offwhite">
        <SearchResults />
      </div>
    </div>
  </div>
</template>
