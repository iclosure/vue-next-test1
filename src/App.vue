<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld :msg="'Hello Vue ' + vueVersion + ' + Vite'" @hello="hello" />
  <router-view></router-view>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import {
  defineComponent,
  provide,
  reactive,
  ref,
  toRefs,
  version as VueVersion
} from "vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld
  },
  setup() {
    //
    const state = reactive({
      vueVersion: VueVersion
    });

    const hello = (msg: string) => {
      console.log("App:", msg);
    };

    //
    const appName = ref("oo-ooo");
    provide("appName", appName);

    return {
      ...toRefs(state),
      hello
    };
  }
});
</script>
