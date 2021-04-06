import React from "react";
import "./App.css";
import LayoutBase from "./layouts/base";
import LayoutHeader from "./layouts/header";
import CompTable, { PaperItem } from "./components/CompTable";
import { PaperStatus, PaperType } from "./const";

export const Data: PaperItem[] = [
  {
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
