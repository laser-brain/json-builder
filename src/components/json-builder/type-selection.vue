<template>
  <div class="grid" @mouseover="showOptions" @mouseleave="hideOptions">
    <div ref="buttonRef" class="fa button-add">
      <fa-icon icon="plus" />
    </div>
    <div class="line hidden" ref="lineRef" />
    <div class="options-list hidden" @mouseleave="hideOptions" ref="optionsRef">
      <span @click="emit('add-property', 'simple')">Simple</span>
      <span @click="emit('add-property', 'complex')">Complex</span>
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
  optionsRef.value?.classList.remove('hidden');
  lineRef.value?.classList.remove('hidden');
  buttonRef.value?.classList.add('open-border');
};

const hideOptions = () => {
  optionsRef.value?.classList.add('hidden');
  lineRef.value?.classList.add('hidden');
  buttonRef.value?.classList.remove('open-border');
};
</script>
<style scoped lang="scss">
.options-list,
.button-add {
  &::after {
    position: absolute;
    border: 1px solid white;
    width: 6px;
    height: 6px;
  }
}

.options-list {
  grid-row: 2 / 2;
  grid-column: 1 / span 2;

  display: inline-flex;
  flex-direction: column;
  position: relative;

  border: 1px solid white;
  border-top: none;
  border-radius: 10%;
  border-top-left-radius: 0%;

  padding: 4px;
  margin-top: -1px;

  &::after {
    content: "";
    top: 0;
    right: -1px;
    box-shadow: 2px -2px 0 black;
    border-top-right-radius: 6px;
    border-width: 1px 1px 0 0;
  }

  & > span {
    border-radius: 5px;
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
  border-radius: 10%;

  width: 32px;
  height: 16px;
  padding: 2px 0 2px 0;

  transition-duration: 200ms;

  &.open-border {
    border-bottom: 1px solid transparent;
    border-bottom-left-radius: 0%;
    border-bottom-right-radius: 0%;

    &::after {
      content: "";
      bottom: -1px;
      right: -7px;
      border-bottom-left-radius: 6px;
      border-width: 0 0 1px 1px;
      box-shadow: -2px 2px 0 black;
    }
  }
}

.line {
  position: absolute;
  top: 21px;
  left: 0;
  right: 0;
  grid-row: 1 / 1;
  grid-column: 2 / 2;
  border-bottom: 1px solid white;
  margin-left: 4px;
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
