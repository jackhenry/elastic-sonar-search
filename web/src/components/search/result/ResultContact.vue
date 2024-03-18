<script setup lang="ts">
import type { GroupedSearchHits } from "@elastic-sonar-search/api";
import ResultCard from "./ResultCard.vue";

defineProps<{
  member: Exclude<GroupedSearchHits["Contact"], undefined>[number];
}>();
</script>

<template>
  <ResultCard :path="`/accounts/show/${member.contactable_id}`">
    <template #title>
      <div
        class="font-medium text-sonar-fg-dark inline-flex items-center flex-wrap"
      >
        <span>{{ member.name }}</span>
        <span v-if="member.role" class="text-xs ml-1 opacity-65"
          >({{ member.role }})</span
        >
        <span
          v-if="member.primary"
          class="ml-1 text-xs mx-1 rounded-lg bg-green-200 px-1 py-[1px] border-[1px] border-sonar-fg-dark/1"
          >Primary</span
        >
      </div>
    </template>
  </ResultCard>
</template>
