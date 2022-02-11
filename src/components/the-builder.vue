<template>
  <div>
    <json-property :json="builder.root"/>
    <pre v-html="JSON.stringify(builder.root, null, 2)" />
  </div>
</template>
<script setup lang="ts">
import JsonProperty from './json-property.vue';
import useBuilderStore from '@/stores/builder-store';

const builder = useBuilderStore();

</script>
