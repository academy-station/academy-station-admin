import cloudbase from "@cloudbase/js-sdk";
import { WX } from "../settings";

const app = cloudbase.init({
  env: WX.ENV_ID,
  appSecret: {
    appAccessKeyId: WX.APPID,
    appAccessKey: WX.APPSECRET,
  },
});
console.log({ app });

const auth = app.auth({
  persistence: "local",
});
console.log({ auth });

console.log("auth logined", auth.hasLoginState());

const db = app.database();
console.log({ db });

const coll_bill = db.collection("bill");
console.log({ coll_bill });

coll_bill.get().then((res) => {
  console.log("bill_data", res);
});
