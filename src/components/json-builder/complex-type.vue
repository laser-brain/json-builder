<template>
  <div>
    <indented-span :offset="element.offset" />
    <json-input
      v-if="element.name !== 'root'"
      :value="element.name"
      type="name"
      :path="element.path"
    />
    <span v-if="element.name !== 'root'">:&nbsp;</span>
    <span v-if="arrayRef">[</span>{
    <json-property v-for="child in element.children" :element="child" :key="child.name" />
    <br v-if="element.children.length === 0" />
    <indented-span :offset="element.offset + 1" />
    <type-selection
      @add-property="(type: 'simple' | 'complex') => builder.addChild(element.path, type)"
    />
    <br />
    <indented-span :offset="element.offset" content="}" />
    <span v-if="arrayRef">]</span>
    <q-toggle
      v-if="element.name !== 'root'"
      v-model="arrayRef"
      label="Allow multiple values"
      checked-icon="check"
      unchecked-icon="clear"
      color="green"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watch, PropType } from 'vue';
import JsonInput from '@/components/json-builder/json-input.vue';
import IndentedSpan from '@/components/indented-span.vue';
import TypeSelection from './type-selection.vue';
import { IJsonProperty } from '@/types/json';
import useBuilderStore from '@/stores/builder-store';

const builder = useBuilderStore();

const props = defineProps({
  element: {
    type: Object as PropType<IJsonProperty>,
    required: true,
  },
});

const arrayRef = ref(props.element.isArray);

watch(arrayRef, () => {
  builder.updateProperty(props.element.path, 'value', props.element.value, arrayRef.value);
});
</script>
<style scoped lang="scss">
</style>
