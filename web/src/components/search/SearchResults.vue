<script setup lang="ts">
import { useSearchHitsStore } from "../../store";
import { type Component, computed, defineAsyncComponent } from "vue";
import { GroupedSearchHits } from "@elastic-sonar-search/api";
import ResultGroup from "./result/ResultGroup.vue";
import { groupNameFromKey } from "../../helpers/group-names";

const store = useSearchHitsStore();

const groups = computed(() => store.groupedSearchHits);

const groupKeyMap = {
  Account: defineAsyncComponent(() => import("./result/ResultAccount.vue")),
  Address: defineAsyncComponent(() => import("./result/ResultAddress.vue")),
  Contact: defineAsyncComponent(() => import("./result/ResultContact.vue")),
  CustomFieldData: defineAsyncComponent(
    () => import("./result/ResultCustomFieldData.vue")
  ),
  Did: defineAsyncComponent(() => import("./result/ResultDid.vue")),
  InventoryModelFieldData: defineAsyncComponent(
    () => import("./result/ResultInventoryModelFieldData.vue")
  ),
  IpAssignment: defineAsyncComponent(
    () => import("./result/ResultIpAssignment.vue")
  ),
  NetworkSite: defineAsyncComponent(
    () => import("./result/ResultNetworkSite.vue")
  ),
  PhoneNumber: defineAsyncComponent(
    () => import("./result/ResultPhoneNumber.vue")
  ),
  RadiusAccount: defineAsyncComponent(
    () => import("./result/ResultAccount.vue")
  ),
  Ticket: defineAsyncComponent(() => import("./result/ResultTicket.vue")),
  UninventoriedMacAddress: defineAsyncComponent(
    () => import("./result/ResultUninventoriedMacAddress.vue")
  ),
} as {
  [key in keyof GroupedSearchHits]: Component;
};
</script>

<template>
  <template v-for="(group, key) in groups">
    <ResultGroup
      v-if="group"
      :key="key"
      :group-name="groupNameFromKey(key)"
      :count="group.length"
      class="break-inside-avoid-column"
    >
      <template #cards>
        <component
          :is="groupKeyMap[key]"
          v-for="hit in group"
          :key="hit.id"
          :member="hit"
        />
      </template>
    </ResultGroup>
  </template>
</template>

<style scoped>
#details {
  box-shadow: inset 1px 0 2px rgba(0, 0, 0, 0.069);
}
</style>
