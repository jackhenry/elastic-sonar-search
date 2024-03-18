<script setup lang="ts">
import type { GroupedSearchHits } from "@elastic-sonar-search/api";
import ResultCard from "./ResultCard.vue";
import Svg from "../../svg/SvgBase.vue";

defineProps<{
  member: Exclude<GroupedSearchHits["PhoneNumber"], undefined>[number];
}>();
</script>

<template>
  <ResultCard :path="`/accounts/show/${member.contact?.contactable_id}`">
    <template #icon>
      <div class="result-icon">
        <Svg icon="phone" />
      </div>
    </template>
    <template #title>
      <div
        v-if="member.number_formatted"
        class="font-medium text-sonar-fg-dark"
      >
        {{ member.number_formatted }}
      </div>
      <div v-else class="font-medium text-sonar-fg-dark">
        {{ member.number }}
      </div>
    </template>
  </ResultCard>
</template>
../../svg/SvgBase.vue
