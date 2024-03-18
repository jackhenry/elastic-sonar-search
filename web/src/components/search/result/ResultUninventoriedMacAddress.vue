<script setup lang="ts">
import type { GroupedSearchHits } from "@elastic-sonar-search/api";
import ResultCard from "./ResultCard.vue";

defineProps<{
  member: Exclude<
    GroupedSearchHits["UninventoriedMacAddress"],
    undefined
  >[number];
}>();
</script>

<template>
  <ResultCard :path="`/accounts/show/${member.account_id}`">
    <template #icon>
      <div class="result-icon">
        <Svg icon="account" />
      </div>
    </template>
    <template #title>
      <div class="font-medium text-sonar-fg-dark">{{ member.mac_address }}</div>
    </template>
  </ResultCard>
</template>
