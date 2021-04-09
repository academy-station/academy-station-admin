import React, { useEffect, useState } from "react";
import "./App.css";
import LayoutBase from "./layouts/LayoutBase";
import { loginUserPswd } from "./functions/cloud";
import { Spin } from "antd";

export const App = () => {
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  useEffect(() => {
    loginUserPswd()
      .then((res) => {
        console.log("云系统登录成功", res);
        setHasLoggedIn(true);
      })
      .catch((err) => {
        console.log("云系统登录失败", err);
      });
  }, []);

  return (
    <div className="App">
      {hasLoggedIn ? (
        <LayoutBase />
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size={"large"} />
          <div style={{ marginTop: "20px" }}>正在加载……</div>
        </div>
      )}
    </div>
  );
};

export default App;
