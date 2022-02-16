<template>
  <div>
    <json-property :element="builder.root"/>
    <hr />
    <q-spinner v-if="saveOperationPending" />
    <q-btn v-else label="Save" @click="saveJson" color="primary" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import useBuilderStore from '@/stores/builder-store';

const builder = useBuilderStore();

const saveOperationPending = ref(false);

const saveJson = async () => {
  saveOperationPending.value = true;
  await builder.save();
  saveOperationPending.value = false;
};
</script>
