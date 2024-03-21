<script setup lang="ts">
import type { GroupedSearchHits } from "@elastic-sonar-search/types";
import ResultCard from "./ResultCard.vue";

defineProps<{
  member: Exclude<GroupedSearchHits["RadiusAccount"], undefined>[number];
}>();
</script>

<template>
  <ResultCard path="/">
    <template #title>
      <div class="font-medium text-sonar-fg-dark">{{ member.username }}</div>
    </template>
  </ResultCard>
</template>
