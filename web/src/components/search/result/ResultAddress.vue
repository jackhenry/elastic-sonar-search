<script setup lang="ts">
import type { GroupedSearchHits } from "@elastic-sonar-search/api";
import ResultCard from "./ResultCard.vue";
import subdivisions from "../../../helpers/subdivisions";
import Svg from "../../svg/SvgBase.vue";

defineProps<{
  member: Exclude<GroupedSearchHits["Address"], undefined>[number];
}>();

function formatAddress(
  address: Exclude<GroupedSearchHits["Address"], undefined>[number]
) {
  const { line1, line2, city, subdivision, zip } = address;

  let addressLine = `${line1}, `;
  addressLine = line2 ? `${addressLine}${line2}, ` : addressLine;
  addressLine = city ? `${addressLine}${city}, ` : addressLine;
  addressLine = subdivision
    ? `${addressLine}${subdivisions["en.subdivisions"][subdivision]} `
    : addressLine;
  addressLine = zip ? `${addressLine} ${zip}` : addressLine;
  return addressLine;
}
</script>

<template>
  <ResultCard :path="`/addresses/show/${member.id}`">
    <template #icon>
      <div class="result-icon">
        <Svg icon="pin" />
      </div>
    </template>
    <template #title>
      <div class="font-medium text-sonar-fg-dark">
        {{ formatAddress(member) }}
      </div>
    </template>
  </ResultCard>
</template>
../../svg/SvgBase.vue
