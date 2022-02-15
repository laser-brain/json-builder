<template>
  <div>
    <indented-span :offset="element.offset" />
    <json-input
      ref="inputName"
      type="name"
      :value="element.name"
      @updated="(newValue) => store.updateProperty(element.path, 'name', newValue)"
    />
    <span>:&nbsp;</span>
    <json-input
      ref="inputValue"
      type="value"
      :value="element.value"
      @updated="(newValue) => store.updateProperty(element.path, 'value', newValue)"
    />
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import JsonInput from '@/components/json-builder/json-input.vue';
import IndentedSpan from '@/components/indented-span.vue';
import { IJsonProperty } from '@/types/json';
import useBuilderStore from '@/stores/builder-store';

const store = useBuilderStore();

defineProps({
  element: {
    type: Object as PropType<IJsonProperty>,
    required: true,
  },
});
</script>
