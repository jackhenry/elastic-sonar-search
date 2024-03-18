<script setup lang="ts">
import { inject, ref, watch } from "vue";
import { setSearchTermSymbol } from "./keys";

const search = ref("");
const setSearchTerm = inject(setSearchTermSymbol);

watch(search, (newSearch) => {
  if (setSearchTerm) {
    setSearchTerm(newSearch);
  }
});
</script>

<template>
  <div
    id="inputWrapper"
    class="relative px-8 bg-white before:font-icons before:content-['\f177'] before:inline-block before:absolute before:top-1/2 before:left-[14px] before:-translate-y-1/2"
  >
    <span
      class="absolute top-1/2 right-0 bottom-0 -translate-y-1/2 w-10 p-0 text-center font-icons after:content-['\f163'] after:cursor-pointer"
    ></span>
    <input
      v-model="search"
      type="text"
      placeholder="Find..."
      class="w-full pl-[40px] h-[59px] rounded-none shadow-none border-none focus:outline-none"
    />
  </div>
</template>

<style scoped>
#inputWrapper {
  box-shadow:
    0 1px 3px 0px rgba(17, 29, 41, 0.15),
    0 1px 10px 0px rgba(17, 29, 41, 0.05),
    0 3px 2px -3px rgba(17, 29, 41, 0.1);
}
</style>
