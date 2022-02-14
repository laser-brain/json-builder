<template>
  <div class="prop-container">
    <flat-value v-if="json.name !== 'root'" :json="json" />
    <template v-else>
      <json-property v-for="child in props.json.children" :key="child.path" :json="child" />
    </template>
    <span v-html="renderIndentation(json.offset, 1)" />
    <button @click="store.addChild(json.path)">+</button>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import FlatValue from '@/components/flat-value.vue';
import { IJsonProperty } from '@/types/json';
import { renderIndentation } from '@/business/strings';
import useBuilderStore from '@/stores/builder-store';

const props = defineProps({
  json: {
    type: Object as PropType<IJsonProperty>,
    required: true,
  },
});

const store = useBuilderStore();

</script>

<style scoped lang="scss">
* {
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace;
}
.json-name,
.json-value {
  border: none;
  background-color: transparent;
  font-size: 1em;

  &:focus {
    outline: none;
  }
}
</style>
