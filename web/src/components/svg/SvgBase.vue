<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const iconMap = {
  account: defineAsyncComponent(() => import("./SvgAccount.vue")),
  globe: defineAsyncComponent(() => import("./SvgGlobe.vue")),
  phone: defineAsyncComponent(() => import("./SvgPhone.vue")),
  site: defineAsyncComponent(() => import("./SvgSite.vue")),
  assignment: defineAsyncComponent(() => import("./SvgAssignment.vue")),
  device: defineAsyncComponent(() => import("./SvgDevice.vue")),
  pin: defineAsyncComponent(() => import("./SvgPin.vue")),
  bubble: defineAsyncComponent(() => import("./SvgBubble.vue")),
};

const props = defineProps<{
  icon: keyof typeof iconMap;
}>();
</script>

<template>
  <component :is="iconMap[props.icon]" />
</template>
