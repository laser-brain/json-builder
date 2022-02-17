<template>
  <div>
    <json-property :element="builder.root" />
    <hr />
    <q-spinner v-if="saveOperationPending" />
    <q-btn v-else label="Save" @click="saveJson" color="primary" />
    <hr v-if="status" />
    <span>{{ status }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import useBuilderStore from '@/stores/builder-store';
import { registerCallback } from '@/business/signalR-plugin';

const saveOperationPending = ref(false);
const status = ref('');

const builder = useBuilderStore();
registerCallback('onSuccess', () => {
  saveOperationPending.value = false;
  status.value = 'Data saved successfully!';

  setTimeout(() => {
    status.value = '';
  }, 2500);
});
registerCallback('onError', (error: string) => {
  saveOperationPending.value = false;
  status.value = error;
});

const saveJson = async () => {
  saveOperationPending.value = true;
  await builder.save();
};
</script>
