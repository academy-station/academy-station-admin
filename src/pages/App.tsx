import React from "react";
import "./App.css";
import LayoutBase from "../layouts/base";
import LayoutHeader from "../layouts/header";
import CompTable, { PaperItem } from "../components/CompTable";
import { PaperStatus, PaperType, WX } from "../settings";

import cloudbase from "@cloudbase/js-sdk";

const app = cloudbase.init({
  env: WX.ENV,
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

export const Data: PaperItem[] = [
  {
    key: "0",
    user_name: "mark",
    paper_name: "test",
    paper_type: PaperType.Normal,
    paper_status: PaperStatus.Pending,
    submit_time: new Date().toLocaleString(),
  },
];

export const CompContent = () => {
  return (
    <div style={{ marginLeft: "20px", width: "50%" }}>
      <CompTable data={Data} />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <LayoutBase content={<CompContent />} header={<LayoutHeader />} />
    </div>
  );
}

export default App;
