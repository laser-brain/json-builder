<template>
  <span @click="emit('clicked')">{{ content }}</span>
</template>
<script setup lang="ts">
defineProps({
  content: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(['clicked']);
</script>
<style scoped lang="scss">
</style>
