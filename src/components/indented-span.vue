<template>
  <span v-html="renderIndentation(offset)" />
</template>
<script setup lang="ts">
import { renderIndentation } from '@/business/strings';

defineProps({
  offset: {
    type: Number,
    required: true,
  },
});
</script>
