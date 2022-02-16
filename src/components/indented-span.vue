<template>
  <span v-html="renderIndentation(offset) + (content || '')" />
</template>
<script setup lang="ts">
import { renderIndentation } from '@/business/strings';

defineProps<{offset: number, content?: string}>();
</script>
