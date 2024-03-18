<script setup lang="ts">
import Svg from "../../svg/SvgBase.vue";
const { path } = defineProps<{
  path: string;
}>();

const baseUrl = new URL(import.meta.env["FRONTEND_SONAR_BASE_URL"]);
const base = `${baseUrl.href}app#`;
const hyperlink = base + path;
</script>

<template>
  <div
    class="flex items-center m-4 p-4 bg-white rounded shadow-sm shadow-black/5 text-sm shrink"
  >
    <div class="relative grow shrink inline-flex items-center">
      <div class="inline-flex mr-1 opacity-[0.6]">
        <slot name="icon" />
      </div>
      <div class="flex flex-col">
        <slot name="title" />
        <slot name="subtitle" />
      </div>
    </div>
    <a
      target="_blank"
      :href="hyperlink.toString()"
      class="inline-flex items-center justify-center cursor-pointer mr-1 px-4 h-[38px] bg-sonar-grey rounded ml-1"
    >
      <div
        class="relative inline-flex w-[1.31em] h-[1.31em] fill-sonar-fg-light text-[18px]"
      >
        <Svg icon="globe" />
      </div>
    </a>
  </div>
</template>
