<template>
  <div v-if="true">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <HelloWorld :msg="'Hello Vue ' + vueVersion + ' + Vite'" @hello="hello" />
    <router-view></router-view>
  </div>
  <div v-else style="width: 100%; height: 100%">
    <video
      autoplay
      muted
      controls
      ref="videoRef"
      width="600"
      height="350"
    ></video>
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import {
  defineComponent,
  onMounted,
  provide,
  reactive,
  ref,
  toRefs,
  version as VueVersion
} from "vue";
import flvjs from "flv.js";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld
  },
  setup() {
    //
    const initData = reactive({
      vueVersion: VueVersion
    });

    const videoRef = ref<HTMLVideoElement>();

    function hello(msg: string): void {
      console.log("App:", msg);
    }

    //
    const appName = ref("oo-ooo");
    provide("appName", appName);

    onMounted(() => {
      if (videoRef.value) {
        if (flvjs.isSupported()) {
          const flvPlayer = flvjs.createPlayer(
            {
              type: "flv",
              isLive: true, //直播模式
              hasAudio: false, //关闭音频
              hasVideo: true,
              url: "http://localhost/live?port=1935&app=myapp&stream=mystream"
            },
            {
              //enableWorker: true, //浏览器端开启flv.js的worker,多进程运行flv.js
              stashInitialSize: 128,
              enableStashBuffer: false //播放flv时，设置是否启用播放缓存，只在直播起作用。
            }
          );
          flvPlayer.attachMediaElement(videoRef.value as HTMLVideoElement);
          flvPlayer.load();
          flvPlayer.play();
        }
      }
    });

    return {
      ...toRefs(initData),
      videoRef,
      hello
    };
  }
});
</script>
