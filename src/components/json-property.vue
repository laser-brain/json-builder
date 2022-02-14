<template>
  <div class="prop-container">
    <span v-html="renderIndentation(1)" />
    <span @click="focusInput(inputName)">"</span>
    <input
      ref="inputName"
      class="json-name"
      type="text"
      v-model="viewModel.name"
      @blur="saveProperty"
      @focus="setInputCursor"
      :style="{ width: `${(viewModel.name.length)}ch` }"
    />
    <span @click="focusInput(inputName)">"</span>:&nbsp;
    <template v-if="json.children.length === 0">
      <span @click="focusInput(inputValue)">"</span>
      <input
        ref="inputValue"
        class="json-value"
        type="text"
        v-model="viewModel.value"
        @blur="saveProperty"
        @focus="setInputCursor"
        :style="{ width: `${(viewModel.value.length)}ch` }"
      />
      <span @click="focusInput(inputValue)">"</span>
    </template>
    <template v-else>
      {
      <json-property v-for="child in props.json.children" :key="child.path" :json="child" />
      <span v-html="renderIndentation(1)" /> },
    </template>
    <br />
    <span v-html="renderIndentation(1)" />
    <button @click="store.addChild(json.path)">+</button>
  </div>
</template>
<script setup lang="ts">
import { PropType, Ref, ref } from 'vue';
import { IJsonProperty } from '@/types/json';
import useBuilderStore from '@/stores/builder-store';

const inputName: Ref<HTMLInputElement | null> = ref(null);
const inputValue: Ref<HTMLInputElement | null> = ref(null);

const props = defineProps({
  json: {
    type: Object as PropType<IJsonProperty>,
    required: true,
  },
});

const store = useBuilderStore();

const viewModel: Ref<IJsonProperty> = ref({ ...props.json });
const history: IJsonProperty[] = [];

const setInputCursor = (e: Event) => {
  if (e instanceof FocusEvent && (e as FocusEvent).type === 'focus' && e.target instanceof HTMLInputElement) {
    const input = e.target as HTMLInputElement;
    input.selectionStart = input.value.length;
    input.selectionEnd = input.value.length;
  }
};

const shouldSendUpdate = (): boolean => {
  const prevState = history.at(-1);
  if (!prevState) {
    return true;
  }

  const { name: prevName, value: prevValue } = prevState;
  const { name, value } = viewModel.value;
  return name !== prevName || value !== prevValue;
};

const saveProperty = () => {
  if (shouldSendUpdate()) {
    store.updateProperty(viewModel.value);
    history.push({ ...viewModel.value });
  }
};

const renderIndentation = (correction?: number) =>
  '&nbsp;'.repeat((props.json.offset + (correction || 0)) * 4);

const focusInput = (target: HTMLInputElement | null) => {
  if (target) {
    target.focus();
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
  background-color: transparent;
  font-size: 1em;

  &:focus {
    outline: none;
  }
}
</style>
