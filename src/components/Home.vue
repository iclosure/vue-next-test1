<template>
  <h1>{{ name }}</h1>
  <el-button type="success" @click="gotoAbout">Got to About Page</el-button>
  <j-button type="warning" name="what" @click="queryData"></j-button>
  <el-button icon="el-icon-user" @click="gotoTest">Go to Test Page</el-button>
  <div class="alert alert-warning">sss</div>
</template>

<script lang="ts">
import { getUserById } from "@/plugins/axios/api";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import PubSub from "pubsub-js";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      name: "Home Page"
    });
    const gotoAbout = () => {
      router.push("/about");
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const pubsub2 = PubSub.subscribe("msg2", (msg: string, data: unknown) => {
      console.log("Home -- pubsub-recv:", msg, data);
    });

    onMounted(() => {
      //PubSub.publish('msg2', '====')
    });

    const queryData = async () => {
      const r = await getUserById(3);
      console.log(r);
      //TEST
      store.state.counter++;
    };

    const gotoTest = () => {
      router.push("/test");
    };

    return {
      ...toRefs(state),
      gotoAbout,
      queryData,
      gotoTest
    };
  }
});
</script>

<style scoped></style>
