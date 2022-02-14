<template>
  <div>
    <indented-span :offset="json.offset" />
    <json-input
      ref="inputName"
      :type="'name'"
      :value="json.name"
      @updated="(newValue) => store.updateProperty(json.path, 'name', newValue)"
    />
    <span>:&nbsp;</span>
    <json-input
      ref="inputValue"
      :type="'value'"
      :value="json.value"
      @updated="(newValue) => store.updateProperty(json.path, 'value', newValue)"
    />
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import JsonInput from '@/components/json-input.vue';
import IndentedSpan from '@/components/indented-span.vue';
import { IJsonProperty } from '@/types/json';
import useBuilderStore from '@/stores/builder-store';

const store = useBuilderStore();

defineProps({
  json: {
    type: Object as PropType<IJsonProperty>,
    required: true,
  },
});
</script>
