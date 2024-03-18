<script setup lang="ts">
const props = defineProps<{
  groupName: string;
  count: number;
}>();
</script>

<template>
  <div class="">
    <div class="cursor-pointer flex items-center justify-between w-full">
      <div class="ml-4">
        {{ props.groupName }}
        <span
          class="inline-flex items-center px-1 bg-black/5 border-black/5 rounded text-sm"
        >
          {{ props.count }} results
        </span>
      </div>
    </div>
    <div class="w-full">
      <slot name="cards"></slot>
    </div>
  </div>
</template>
