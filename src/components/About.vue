<template>
  <h1>{{ name }}</h1>
  <el-button @click="goBackHome">Go Back Home Page</el-button>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import PubSub from "pubsub-js";

export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive({
      name: "About Page"
    });
    const goBackHome = () => {
      router.back();
    };

    const pubsub1 = PubSub.subscribe("msg1", (msg: string, data: unknown) => {
      console.log("About -- pubsub-recv:", msg, data);
    });

    onMounted(() => {
      PubSub.publish("msg1", "what the fuck!");
    });

    onUnmounted(() => {
      //console.log('==onUnmounted')
      PubSub.unsubscribe(pubsub1);
    });

    return {
      ...toRefs(state),
      goBackHome
    };
  }
});
</script>

<style scoped></style>
