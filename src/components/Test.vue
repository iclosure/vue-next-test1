<template>
  <el-button @click="click" j-test1="222">Go Back</el-button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { attrs, slots, emit }) {
    const router = useRouter();
    const state = reactive({
      count: 4
    });
    console.log("====", props, attrs);
    const click = () => {
      emit("test1", "hello 1");
      router.back();
    };
    return {
      ...toRefs(state),
      click
    };
  }
});
</script>

<style scoped></style>
