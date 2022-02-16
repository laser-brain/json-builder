<template>
  <div>
    <json-property :element="builder.root" />
    <hr />
    <q-spinner v-if="saveOperationPending" />
    <q-btn v-else label="Save" @click="saveJson" color="primary" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import useBuilderStore from '@/stores/builder-store';
import { registerCallback } from '@/business/signalR-plugin';

const saveOperationPending = ref(false);

const builder = useBuilderStore();
registerCallback('onSuccess', () => {
  saveOperationPending.value = false;
});

const saveJson = async () => {
  saveOperationPending.value = true;
  await builder.save();
};
</script>
