<template>
  <div style="display: inline-block">
    <click-span :content="quotes" @clicked="focusInput" />
    <input
      ref="inputRef"
      :class="inputClass"
      type="text"
      v-model="valueRef"
      @blur="saveProperty"
      @focus="setInputCursor"
      :style="{ width: `${(valueRef.length)}ch` }"
    />
    <click-span :content="quotes" @clicked="focusInput" />
  </div>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue';
import ClickSpan from '@/components/click-span.vue';
import useHistory from '@/business/input-history';

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['updated']);

const { updateHistory } = useHistory();

const valueRef = ref(props.value);

const saveProperty = () => {
  if (updateHistory(valueRef.value)) {
    emit('updated', valueRef.value);
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
