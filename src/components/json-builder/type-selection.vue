<template>
  <div class="grid" @mouseover="showOptions" @mouseleave="hideOptions">
    <div ref="buttonRef" class="fa button-add">
      <fa-icon icon="plus" />
    </div>
    <div class="line hidden" ref="lineRef" />
    <div class="options-list hidden" @mouseleave="hideOptions" ref="optionsRef">
      <span @click="addProperty('simple')">Simple</span>
      <span @click="addProperty('complex')">Complex</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue';

const emit = defineEmits(['add-property']);

const optionsRef: Ref<HTMLElement | null> = ref(null);
const lineRef: Ref<HTMLElement | null> = ref(null);
const buttonRef: Ref<HTMLElement | null> = ref(null);

const showOptions = () => {
  if (optionsRef.value) {
    optionsRef.value.classList.remove('hidden');
    optionsRef.value.style.zIndex = '2';
  }
  if (lineRef.value) {
    lineRef.value.classList.remove('hidden');
    lineRef.value.style.zIndex = '3';
  }
  buttonRef.value?.classList.add('open-border');
};

const hideOptions = () => {
  if (optionsRef.value) {
    optionsRef.value.classList.add('hidden');
    optionsRef.value.style.zIndex = '';
  }
  if (lineRef.value) {
    lineRef.value.classList.add('hidden');
    lineRef.value.style.zIndex = '';
  }
  buttonRef.value?.classList.remove('open-border');
};

const addProperty = (type: 'simple' | 'complex') => {
  hideOptions();
  emit('add-property', type);
};
</script>
<style scoped lang="scss">
$button-base-dimension: calc(1.5em + 6px);

.options-list::after,
.button-add::after {
  position: absolute;
  border: 1px solid white;
  width: 6px;
  height: 6px;
}

.options-list {
  grid-row: 2 / 2;
  grid-column: 1 / span 2;

  display: inline-flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  background: black;

  border: 1px solid white;
  border-top: none;
  border-radius: 0.2em;
  border-top-left-radius: 0%;

  padding: 4px;
  margin-top: -1px;

  &::after {
    content: "";
    top: 0;
    right: -1px;
    box-shadow: 2px -2px 0 black;
    border-top-right-radius: 0.2em;
    border-width: 1px 1px 0 0;
  }

  & > span {
    border-radius: 0.2em;
    padding: 2px;
    cursor: pointer;

    &:hover {
      background-color: gray;
      color: black;
    }
  }
}

.button-add {
  position: relative;
  display: flex;
  justify-content: center;

  border: 1px solid white;
  border-radius: 0.2em;

  width: calc($button-base-dimension * 2);
  height: $button-base-dimension;
  padding: calc(1em / 4) 0 calc(1em / 6) 0;

  z-index: 1;
  transition-duration: 200ms;

  &.open-border {
    border-bottom: 1px solid transparent;
    border-bottom-left-radius: 0%;
    border-bottom-right-radius: 0%;

    &::after {
      content: "";
      bottom: -0.9px;
      right: -6px;
      border-bottom-left-radius: 0.2em;
      border-width: 0 0 1px 1px;
      box-shadow: -2px 2px 0 black;
    }
  }
}

.line {
  position: absolute;
  top: calc($button-base-dimension - 1px);
  left: 2px;
  right: 4px;
  grid-row: 1 / 1;
  grid-column: 2 / 2;
  border-bottom: 1px solid white;
  z-index: 1;
}

.grid {
  display: inline-grid;
  position: relative;
  grid-template-columns: 1fr 100%;
  grid-template-rows: 1fr 100%;
}

.hidden {
  display: none;
}
</style>
