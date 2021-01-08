<template>
  <h1>{{ name }}</h1>
  <el-button @click="goBackHome">Go Back Home Page</el-button>
  <div ref="sliderRef" id="slider" class="slider"></div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
  toRefs
} from "vue";
import { useRouter } from "vue-router";
import PubSub from "pubsub-js";
import * as echarts from "echarts";

interface IState {
  name: string;
  chart: any;
}

export default defineComponent({
  setup() {
    const router = useRouter();
    const initData = reactive<IState>({
      name: "About Page",
      chart: null
    });

    const sliderRef = ref<HTMLDivElement>();

    const goBackHome = () => {
      router.back();
    };

    const pubsub1 = PubSub.subscribe("msg1", (msg: string, data: unknown) => {
      console.log("About -- pubsub-recv:", msg, data);
    });

    onMounted(() => {
      PubSub.publish("msg1", "what the fuck!");
      initData.chart = echarts.init(
        document.getElementById("slider") as HTMLElement,
        "light"
      );
      initData.chart?.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line"
          }
        ]
      });
      //
    });
    onUnmounted(() => {
      PubSub.unsubscribe(pubsub1);
    });
    onUpdated(() => {
      initData.chart?.resize();
    });

    return {
      ...toRefs(initData),
      goBackHome
    };
  }
});
</script>

<style scoped>
.slider {
  width: 100%;
  height: 100%;
}
</style>
