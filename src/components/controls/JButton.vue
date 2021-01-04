<template>
  <el-button>{{ name }}</el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: String
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
