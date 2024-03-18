<script setup lang="ts">
import type { GroupedSearchHits } from "@elastic-sonar-search/api";
import ResultCard from "./ResultCard.vue";
import Svg from "../../svg/SvgBase.vue";

defineProps<{
  member: Exclude<
    GroupedSearchHits["InventoryModelFieldData"],
    undefined
  >[number];
}>();
</script>

<template>
  <ResultCard :path="`/inventory/item/show/${member.inventory_item_id}`">
    <template #icon>
      <div class="result-icon">
        <Svg icon="device" />
      </div>
    </template>
    <template #title>
      <div class="font-medium text-sonar-fg-dark">{{ member.value }}</div>
    </template>
    <template #subtitle>
      <div class="text-[10px]">
        {{ member.inventory_model_field?.inventory_model?.name }}-
        {{ member.value }}
      </div>
    </template>
  </ResultCard>
</template>
../../svg/SvgBase.vue
