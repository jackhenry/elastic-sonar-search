<script setup lang="ts">
import type { GroupedSearchHits } from "@elastic-sonar-search/types";
import ResultCard from "./ResultCard.vue";
import Svg from "../../svg/SvgBase.vue";

defineProps<{
  member: Exclude<GroupedSearchHits["Did"], undefined>[number];
}>();
</script>

<template>
  <ResultCard path="show">
    <template #icon>
      <div class="result-icon">
        <Svg icon="phone" />
      </div>
    </template>
    <template #title>
      <div class="font-medium text-sonar-fg-dark">
        {{ member.number }}
      </div>
    </template>
  </ResultCard>
</template>
../../svg/SvgBase.vue
