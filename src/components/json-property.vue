<template>
  <div class="prop-container">
    <span v-html="renderIndentation()" />{
    <br />
    <span v-html="renderIndentation(1)" />
    <span @click="focusInput(inputName)">"</span>
    <input
      ref="inputName"
      class="json-name"
      type="text"
      v-model="viewModel.propertyName"
      @blur="saveProperty"
      @focus="setInputCursor"
      :style="{ width: `${(viewModel.propertyName.length)}ch` }"
    />
    <span @click="focusInput(inputName)">"</span>:&nbsp;
    <span @click="focusInput(inputValue)">{{ isObject ? '{' : isArray ? '[' : '"' }}</span>
    <input
      ref="inputValue"
      class="json-value"
      type="text"
      v-model="viewModel.propertyValue"
      @blur="saveProperty"
      @focus="setInputCursor"
      :style="{ width: `${(viewModel.propertyValue.length)}ch` }"
    />
    <span @click="focusInput(inputValue)">"</span>
    <div v-if="hasChildren()">
      <json-property
        v-for="child in getChildren()"
        :key="child.path"
        :json="child"
        @value-reset="resetChild(child)"
      />
    </div>
    <span v-html="renderIndentation(1)" />
    <span v-html="renderIndentation()" />
    <br />}
    <span>array: {{ isArray }}, object: {{ isObject }}</span>
  </div>
</template>
<script setup lang="ts">
import {
  PropType, Ref, ref, computed,
} from 'vue';
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

const initialState = { ...props.json };
const viewModel: Ref<IJsonProperty> = ref({ ...props.json });
const history: IJsonProperty[] = [];

const isArray = computed(() => viewModel.value.propertyValue.startsWith('['));
const isObject = computed(() => viewModel.value.propertyValue.startsWith('{'));
const hasChildren = (): boolean => (isArray.value || isObject.value) && typeof props.json.propertyValue === 'object';
const getChildren = (): IJsonProperty[] => JSON.parse(props.json.propertyValue) as IJsonProperty[];

const store = useBuilderStore();

const setInputCursor = (e: Event) => {
  if (e instanceof FocusEvent && (e as FocusEvent).type === 'focus' && e.target instanceof HTMLInputElement) {
    const input = e.target as HTMLInputElement;
    input.selectionStart = input.value.length;
    input.selectionEnd = input.value.length;
  }
};

const checkHistory = (): boolean => {
  const prevState = history.at(-1);
  if (!prevState) {
    return true;
  }

  // TODO: Fix history check!
  return true;
  //   const { propertyName: prevName, propertyValue: prevValue } = prevState;
  //   const { propertyName, propertyValue } = viewModel.value;
  //   return propertyName !== prevName || propertyValue !== prevValue;
};

const saveProperty = () => {
  if (checkHistory()) {
    store.updateProperty(initialState.path, viewModel.value);
    history.push(viewModel.value);
  }
};

const renderIndentation = (correction?: number) =>
  '&nbsp;'.repeat((props.json.offset + (correction || 0)) * 2);

const focusInput = (target: HTMLInputElement | null) => {
  if (target) {
    target.focus();
  }
};

const resetChild = (child: IJsonProperty): void => {
  // eslint-disable-next-line no-param-reassign
  child.propertyValue = '';
};

defineEmits(['value-reset']);

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
