import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import baseURL from "./baseURL";
import qs from "qs";
import { ElMessage } from "element-plus";

// 默认超时时间
axios.defaults.timeout = 30000;
// 相对路径
axios.defaults.baseURL = baseURL;

// 创建服务请求实例
const service: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "/api" : "",
  timeout: 30000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    // 'Content-Type': 'application/json',
  }
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 获取token
    const token = localStorage.getItem("cc_token");
    // 添加token到headers
    if (token) {
      config.headers.token = token;
    }
    // 鉴权参数设置
    if (config.method === "get") {
      //
    } else {
      if (config.data instanceof Array) {
        config.headers["Content-Type"] = "application/json";
      } else {
        config.headers["Content-Type"] = "application/x-www-form-urlencoded";
        config.data = qs.stringify(config.data || {});
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    // 一些同意code的返回处理
    if (response.data?.code === 0) {
      //
    }
    return response;
  },
  (error) => Promise.reject(error)
);

/**
 * 获取数据
 * @param {String} url 消息地址
 * @param {Object} params 数据信息
 */
export function get(url: string, params?: unknown): Promise<unknown> {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
        ElMessage.warning("请求失败！请检查网络");
      });
  });
}

/**
 * 设置数据
 * @param {String} url 消息地址
 * @param {Object} data 数据信息
 */
export function put(url: string, data: unknown): Promise<unknown> {
  return new Promise((resolve, reject) => {
    service.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (error) => {
        reject(error);
        ElMessage.warning("请求失败！请检查网络");
      }
    );
  });
}

/**
 * 异步请求
 * @param {String} url 消息地址
 * @param {Object} data 数据信息
 * @param {Boolean} silent 是否静默，即是否打印错误时的信息
 */
export function post(
  url: string,
  data: unknown,
  silent = false
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    service.post(url, data).then(
      (response) => {
        if (silent !== true) {
          if (response.data?.code !== undefined && response.data.code !== 0) {
            console.error(
              `Request POST error - code: ${response.data?.code}, msg: ${
                response.data?.msg
              }, url: ${response.config.url}, data: ${JSON.stringify(
                qs.parse(response.config.data)
              )}`
            );
          }
          resolve(response.data);
        }
      },
      (error) => {
        if (silent !== true) {
          reject(error);
          ElMessage.warning("请求失败！请检查网络");
        }
      }
    );
  });
}

/**
 *
 * @param {String} url 消息地址
 * @param {Object} data 数据信息
 */
export function patch(url: string, data: unknown): Promise<unknown> {
  return new Promise((resolve, reject) => {
    service.patch(url, data).then(
      (response) => {
        if (response.data?.code === 200) {
          resolve(response.data);
        } else {
          ElMessage.warning(response.data?.msg);
        }
      },
      (error) => {
        reject(error);
        ElMessage.warning("请求失败！请检查网络");
      }
    );
  });
}

/**
 * 删除数据
 * @param {String} url 消息地址
 * @param {Object} data 数据信息
 */
export function del(
  url: string,
  data: AxiosRequestConfig | undefined = undefined
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    service.delete(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (error) => {
        reject(error);
        ElMessage.warning("请求失败！请检查网络");
      }
    );
  });
}
