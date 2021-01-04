import { ElLoading } from "element-plus";
import { ILoadingInstance } from "element-plus/lib/el-loading/src/loading.type";
import { App } from "vue";
import JButton from "@/components/controls/JButton.vue";
import "./utils";

const install = (app: App) => {
  app.component("j-button", JButton);
  // directive
  app.directive("j-test1", {
    mounted(el) {
      console.log("j-test1:", el);
    }
  });
};

export default install;

/// {{ global loading

let globalLoading: ILoadingInstance | null = null;

export function startLoading(msg: string, fullscreen = true) {
  if (globalLoading) {
    globalLoading.close();
  }
  globalLoading = ElLoading.service({
    lock: true,
    text: msg,
    background: "rgba(0, 0, 0, 0.7)",
    fullscreen: fullscreen
  });
}

export function endLoading() {
  if (globalLoading) {
    globalLoading.close();
    globalLoading = null;
  }
}

/// global loading }}

/// {{ Date

Date.prototype.Format = function(format: string) {
  interface DateObject {
    [key: string]: object;
  }
  const o: object = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };
  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const key of Object.keys(o)) {
    if (Object.prototype.hasOwnProperty.call(o, key)) {
      const value: string = (o as DateObject)[key].toString();
      if (new RegExp(`(${key})`).test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? value
            : `00${value}`.substr(`${value}`.length)
        );
      }
    }
  }

  return format;
};

Date.prototype.ToString = function() {
  const addZero = (num: number) => (num < 10 ? `0${num}` : num);
  return `${addZero(this.getFullYear())}-${addZero(
    this.getMonth() + 1
  )}-${addZero(this.getDate())} ${addZero(this.getHours())}:${addZero(
    this.getMinutes()
  )}:${addZero(this.getSeconds())}`;
};

/// Date }}
