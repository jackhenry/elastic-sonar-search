<script setup lang="ts">
import type { GroupedSearchHits } from "@elastic-sonar-search/api";
import ResultCard from "./ResultCard.vue";
import Svg from "../../svg/SvgBase.vue";

defineProps<{
  member: Exclude<GroupedSearchHits["CustomFieldData"], undefined>[number];
}>();
</script>

<template>
  <ResultCard path="todo">
    <template #icon>
      <div class="result-icon">
        <Svg icon="device" />
      </div>
    </template>
    <template #title>
      <div class="font-medium text-sonar-fg-dark">{{ member.value }}</div>
    </template>
  </ResultCard>
</template>
../../svg/SvgBase.vue
