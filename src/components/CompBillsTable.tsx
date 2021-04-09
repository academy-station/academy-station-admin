import { Avatar, Button, message, Table, Tag, Upload } from "antd";

import { BillStatus, BillType } from "../ds/bill";
import { ColumnType } from "antd/es/table";
import cloud from "../functions/cloud";
import { RcFile } from "antd/es/upload";
import { CloudBaseUrl } from "../settings";

export const handleDownloadPaper = async (record: any) => {
  const fileId = [CloudBaseUrl, "paper", record.fileId].join("/");
  console.log({ fileId, record });
  const res = await cloud.downloadFile({
    fileID: fileId,
  });
  message.success("下载成功");
  console.log("下载成功", res);
};

export const checkUpload = (file: RcFile) => {
  const qualified = file.name.search(/\.docx?$/) > 0;
  if (!qualified) {
    message.error(`${file.name} 不是一个word文档`);
  }
  return qualified ? true : Upload.LIST_IGNORE;
};

export const handleUploadReport = async (
  info: any,
  record: any,
  seq: number
) => {
  // 上传文件
  await cloud.uploadFile({
    cloudPath: "report" + seq + "/" + record.fileId,
    // @ts-ignore
    filePath: info.file,
  });
  console.log("报告 1 上传成功");

  // 更新记录
  const res = await cloud.callFunction({
    name: "db_update_report",
    data: {
      _id: record._id,
      report_seq: 1,
    },
  });
  console.log("报告上传记录更新", res);
  message.success("报告上传成功");
};

export const handleFinishReport = async (record: any) => {
  const res = await cloud.callFunction({
    name: "db_finish_bill",
    data: { _id: record._id },
  });
  console.log("完成订单", res);
  message.success("成功结单！");
};

export const columns: ColumnType<any>[] = [
  {
    title: "用户头像",
    dataIndex: ["user", "avatarUrl"],
    render: (text) => {
      return <Avatar src={text} />;
    },
  },
  {
    title: "用户昵称",
    dataIndex: ["user", "nickName"],
  },
  {
    title: "文档名称",
    dataIndex: "name",
  },
  {
    title: "提交时间",
    dataIndex: ["times", "submitTime"],
    render: (time: number) => {
      return new Date(time).toLocaleString();
    },
  },
  {
    title: "查重类型",
    dataIndex: "type",
    render: (Bill_type: BillType) => {
      return (
        <Tag color={Bill_type === BillType.Normal ? "green" : "red"}>
          {Bill_type === BillType.Normal ? BillType.Normal : BillType.Fast}
        </Tag>
      );
    },
  },
  {
    title: "查重状态",
    dataIndex: "status",
    render: (Bill_status: BillStatus) => {
      return (
        <Tag color={Bill_status === BillStatus.Handling ? "red" : "green"}>
          {Bill_status}
        </Tag>
      );
    },
  },
  {
    title: "操作",
    dataIndex: "operations",
    render: (text, record) => {
      return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type={"primary"} onClick={() => handleDownloadPaper(record)}>
            下载
          </Button>

          <Upload
            maxCount={1}
            beforeUpload={checkUpload}
            showUploadList={false}
            customRequest={(info) => handleUploadReport(info, record, 1)}
          >
            <Button type={"primary"}>
              {record.report1 ? "重新上传 1" : "上传 1"}
            </Button>
          </Upload>

          <Upload
            maxCount={1}
            beforeUpload={checkUpload}
            showUploadList={false}
            customRequest={(info) => handleUploadReport(info, record, 2)}
          >
            <Button type={"primary"}>
              {record.report2 ? "重新上传 2" : "上传 2"}
            </Button>
          </Upload>

          <Button
            type={"primary"}
            danger
            onClick={() => {
              handleFinishReport(record);
            }}
          >
            确认结单
          </Button>
        </div>
      );
    },
  },
];

export interface BillItem {
  key: string | number;
  user_name: string;
  Bill_name: string;
  submit_time: string;
  Bill_type: BillType;
  Bill_status: BillStatus;
}

export interface CompTableProps {
  data: BillItem[];
}

export const CompBillsTable = (props: CompTableProps) => {
  return <Table columns={columns} dataSource={props.data} rowKey={"_id"} />;
};

export default CompBillsTable;
