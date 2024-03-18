<script setup lang="ts">
import type { GroupedSearchHits } from "@elastic-sonar-search/api";
import ResultCard from "./ResultCard.vue";
import Svg from "../../svg/SvgBase.vue";

const { member } = defineProps<{
  member: Exclude<GroupedSearchHits["IpAssignment"], undefined>[number];
}>();
</script>

<template>
  <ResultCard
    :path="`/network/ipam/${member.parent_subnet?.supernet_id}/subnet/${member.subnet_id}/assignment/${member.id}`"
  >
    <template #icon>
      <div class="result-icon">
        <Svg icon="assignment" />
      </div>
    </template>
    <template #title>
      <div class="font-medium text-sonar-fg-dark">{{ member.subnet }}</div>
    </template>
  </ResultCard>
</template>
../../svg/SvgBase.vue
