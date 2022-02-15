<template>
  <div>
    <json-property :element="builder.root"/>
    <hr />
    <pre v-html="JSON.stringify(builder.root, null, 2)" />
  </div>
</template>
<script setup lang="ts">
import useBuilderStore from '@/stores/builder-store';

const builder = useBuilderStore();
</script>
