<template>
  <div class="prop-container">
    <flat-value v-if="json.name !== 'root'" :json="json" />
    <template v-else>
      <json-property v-for="child in json.children" :key="child.path" :json="child" />
      <indented-span :offset="json.offset + 1" />
      <type-selection />
    </template>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import FlatValue from '@/components/json-builder/flat-value.vue';
import TypeSelection from '@/components/json-builder/type-selection.vue';
import { IJsonProperty } from '@/types/json';
import IndentedSpan from '@/components/indented-span.vue';

defineProps({
  json: {
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
