<template>
  <div style="display: inline-block">
    <click-span v-if="showQuotes" :content="quotes" @clicked="focusInput" />
    <input
      ref="inputRef"
      :class="inputClass"
      type="text"
      v-model="valueRef"
      @blur="saveProperty"
      @focus="setInputCursor"
      :style="{ width: `${(valueRef.length)}ch` }"
    />
    <click-span v-if="showQuotes" :content="quotes" @clicked="focusInput" />
  </div>
</template>
<script setup lang="ts">
import { computed, Ref, ref } from 'vue';
import ClickSpan from '@/components/click-span.vue';
import useHistory from '@/business/input-history';
import useBuilderStore from '@/stores/builder-store';

const builder = useBuilderStore();

const props = defineProps<{ value: string, type: 'name' | 'value', path: string }>();

const { updateHistory } = useHistory();

const valueRef = ref(props.value);

const saveProperty = () => {
  if (updateHistory(valueRef.value)) {
    builder.updateProperty(props.path, props.type, valueRef.value);
  }
};

const quotes = '"';
const inputClass = `json-${props.type}`;
const inputRef: Ref<HTMLInputElement | null> = ref(null);

const focusInput = () => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
};

const setInputCursor = (e: Event) => {
  if (e instanceof FocusEvent && (e as FocusEvent).type === 'focus' && e.target instanceof HTMLInputElement) {
    const input = e.target as HTMLInputElement;
    input.selectionStart = input.value.length;
    input.selectionEnd = input.value.length;
  }
};

const showQuotes = computed(() =>
  props.type === 'name'
  || (Number.isNaN(parseInt(valueRef.value, 10))
  && ['true', 'false'].indexOf(valueRef.value?.toLowerCase()) === -1));

</script>
<style scoped lang="scss">
* {
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace;
}
.json-name,
.json-value {
  border: none;
  color: white;
  background-color: transparent;
  font-size: 1em;

  &:focus {
    outline: none;
  }
}
</style>
