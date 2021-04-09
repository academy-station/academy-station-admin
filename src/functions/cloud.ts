import cloudbase from "@cloudbase/js-sdk";
import { CloudSettings, WX } from "../settings";

export const cloud = cloudbase.init({ env: WX.ENV_ID });
export const db = cloud.database();
const auth = cloud.auth({ persistence: "local" });

export async function loginUserPswd() {
  const user = CloudSettings.CMS_Accounts.SystemManager;
  const { Username, Password } = user;
  return await auth.signInWithUsernameAndPassword(Username, Password);
}

export async function loginAnonymous() {
  return auth.anonymousAuthProvider().signIn();
  // 匿名登录成功检测登录状态isAnonymous字段为true
  // return  await auth.getLoginState();
}

export default cloud;
