<template>
  <div>
    <indented-span :offset="element.offset" />
    <json-input
      ref="inputName"
      type="name"
      :value="element.name"
      :path="element.path"
      :is-array="element.isArray"
    />
    <span>:&nbsp;</span>
    <json-input
      ref="inputValue"
      type="value"
      :value="element.value"
      :path="element.path"
      :is-array="element.isArray"
    />
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import JsonInput from '@/components/json-builder/json-input.vue';
import IndentedSpan from '@/components/indented-span.vue';
import { IJsonProperty } from '@/types/json';

defineProps({
  element: {
    type: Object as PropType<IJsonProperty>,
    required: true,
  },
});
</script>
