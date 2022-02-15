<template>
  <div class="prop-container">
    <complex-type v-if="element.value === 'complex'" :element="element" />
    <simple-type v-else :element="element" />
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { IJsonProperty } from '@/types/json';
import SimpleType from '@/components/json-builder/simple-type.vue';
import ComplexType from '@/components/json-builder/complex-type.vue';

defineProps({
  element: {
    type: Object as PropType<IJsonProperty>,
    required: true,
  },
});

</script>

<style scoped lang="scss">
* {
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace;
}
</style>
