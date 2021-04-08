import { Button, Table, Tag } from "antd";
import { PaperStatus, PaperType } from "../settings";

export const columns = [
  {
    title: "用户昵称",
    dataIndex: "user_name",
    key: "user_name",
  },
  {
    title: "文档名称",
    dataIndex: "paper_name",
    key: "paper_name",
  },
  {
    title: "提交时间",
    dataIndex: "submit_time",
    key: "submit_time",
  },
  {
    title: "查重类型",
    dataIndex: "paper_type",
    key: "paper_type",
    render: (paper_type: PaperType) => {
      return (
        <Tag color={paper_type === PaperType.Normal ? "green" : "red"}>
          {paper_type}
        </Tag>
      );
    },
  },
  {
    title: "查重状态",
    dataIndex: "paper_status",
    key: "paper_status",
    render: (paper_status: PaperStatus) => {
      return (
        <Tag
          color={
            paper_status === PaperStatus.Pending
              ? "red"
              : paper_status === PaperStatus.Handling
              ? "gray"
              : "green"
          }
        >
          {paper_status}
        </Tag>
      );
    },
  },
  {
    title: "操作",
    dataIndex: "operations",
    render: () => {
      return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type={"primary"}>下载</Button>
          <Button type={"primary"} danger>
            上传 1
          </Button>
          <Button type={"primary"} danger>
            上传 2
          </Button>
        </div>
      );
    },
  },
];

export interface PaperItem {
  key: string | number;
  user_name: string;
  paper_name: string;
  submit_time: string;
  paper_type: PaperType;
  paper_status: PaperStatus;
}

export interface CompTableProps {
  data: PaperItem[];
}

export const CompTable = (props: CompTableProps) => {
  return <Table columns={columns} dataSource={props.data} />;
};

export default CompTable;
