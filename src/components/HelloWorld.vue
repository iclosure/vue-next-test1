<template>
  <h1 style="color: blue">{{ msg }}</h1>
  <el-button type="primary" class="bi bi-alarm-fill" @click="addCounter"
    >counter is: {{ counter }}</el-button
  >
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  nextTick,
  reactive,
  Ref,
  toRefs
} from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String
  },
  emits: ["hello"],
  setup(props, { emit }) {
    const store = useStore();
    // state
    const state = reactive({
      counter: computed(() => store.state.counter),
      addCounter: async () => {
        store.state.counter++;
        await nextTick();
        //TEST
        emit("hello", "world");
      }
    });

    //TEST
    const appName = inject<Ref<string>>("appName");
    console.log("helloworld:", appName?.value);

    return toRefs(state);
  }
});
</script>
