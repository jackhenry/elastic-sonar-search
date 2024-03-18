<script setup lang="ts">
import type { GroupedSearchHits } from "@elastic-sonar-search/api";
import ResultCard from "./ResultCard.vue";
import Svg from "../../svg/SvgBase.vue";

defineProps<{
  member: Exclude<GroupedSearchHits["Ticket"], undefined>[number];
}>();
</script>

<template>
  <ResultCard :path="`/tickets/show/${member.id}`">
    <template #icon>
      <div class="result-icon">
        <Svg icon="bubble" />
      </div>
    </template>
    <template #title>
      <div class="font-medium text-sonar-fg-dark">{{ member.subject }}</div>
    </template>
  </ResultCard>
</template>
../../svg/SvgBase.vue
