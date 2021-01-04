/* eslint-disable */
import { get } from "./index";
import { ElMessage } from "element-plus";

// =====================================================

// {{ user

/**
 * 获取指定标识的用户信息
 * @param {Number} id 用户标识
 */
export async function getUserById(id: number): Promise<unknown> {
  const r: any = await get("/prefer/user/getById", { id });
  if (r?.code == 0) {
    return r.data;
  } else {
    ElMessage.warning("get user failure!");
    return null;
  }
}

// TEST
export async function getProtocol(): Promise<unknown> {
  const r: any = await get("/prefer/user/getProtocol");
  if (r?.code === 0) {
    return r.data;
  } else {
    ElMessage.warning("get protocol failure!");
    return null;
  }
}

// user }}

// =====================================================
