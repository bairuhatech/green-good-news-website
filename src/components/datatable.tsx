import React, { useState } from "react";
import { Table, Tag, Select } from "antd";
import { FaPen, FaTrash } from "react-icons/fa";
import { RiFileCopyFill } from "react-icons/ri";
import "./Styles.scss";

interface DataTableProps {
  data: any;
}
const DataTable: React.FC<DataTableProps> = (props) => {
  const columns = [
    {
      title: "Id",
      dataIndex: "attributes",
      render: ({}, {}, index: any) => <a>{index + 1}</a>,
    },
    {
      title: "Title",
      dataIndex: "attributes",
      render: (text: any) => <a>{text.title}</a>,
    },
    {
      title: "Head",
      dataIndex: "attributes",
      render: (text: any) => <a>{text.head}</a>,
    },
    {
      title: "Image",
      dataIndex: "attributes",
      render: (text: any) => <a>{text.image}</a>,
    },
    {
      title: "Content Available In",
      dataIndex: "attributes",
      render: (text: any) => (
        <Select style={{ width: "170px" }} placeholder={"Languages"}>
          <Select.Option>English</Select.Option>
          <Select.Option>Malayalam</Select.Option>
        </Select>
      ),
    },
    {
      title: "State",
      key: "state",
      dataIndex: "attributes",
      render: () => <Tag color={"red"}>published</Tag>,
    },
    {
      title: "Actions",
      key: "action",
      dataIndex: "attributes",
      render: () => (
        <div
          style={{
            display: "flex",
            width: "80px",
            justifyContent: "space-evenly",
          }}
        >
          <FaPen size={14} />
          <RiFileCopyFill size={14} />
          <FaTrash size={12} />
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: DataTableProps[]
    ) => {
      // console.log(
      //   `selectedRowKeys: ${selectedRowKeys}`,
      //   "selectedRows: ",
      //   selectedRows
      // );
    },
  };
  return (
    <div>
      <Table
        className="custom-table"
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={props.data}
      />
    </div>
  );
};

export default DataTable;
