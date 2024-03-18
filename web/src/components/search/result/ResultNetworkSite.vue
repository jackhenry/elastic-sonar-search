<script setup lang="ts">
import type { GroupedSearchHits } from "@elastic-sonar-search/api";
import ResultCard from "./ResultCard.vue";
import Svg from "../../svg/SvgBase.vue";

defineProps<{
  member: Exclude<GroupedSearchHits["NetworkSite"], undefined>[number];
}>();
</script>

<template>
  <ResultCard :path="`/network/sites/show/${member.id}`">
    <template #icon>
      <div class="result-icon">
        <Svg icon="site" />
      </div>
    </template>
    <template #title>
      <div class="font-medium text-sonar-fg-dark">{{ member.name }}</div>
    </template>
  </ResultCard>
</template>
../../svg/SvgBase.vue
