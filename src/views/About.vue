<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div ref="sliderRef" class="slider"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import * as echarts from "echarts";

export default defineComponent({
  setup() {
    const initData = reactive({
      a: 0
    });

    const sliderRef = ref<HTMLDivElement>();

    onMounted(() => {
      const chart = echarts.init(sliderRef.value as HTMLElement);
      chart.setOption({});
      console.log("=====", chart);
    });

    return { ...toRefs(initData), sliderRef };
  }
});
</script>

<style scoped>
.slider {
  width: 100%;
  height: 100%;
}
</style>
