import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { useTranslation } from "react-i18next";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import mockedData from "./mockData";
import styles from "../sharedStyles.module.scss";

function CustomsTable() {
  const { t } = useTranslation();
  const [data, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const columns = [
    {
      title: t("Code"),
      dataIndex: "code",
      sorter: {}
    },
    {
      title: t("Type régime"),
      dataIndex: "type",
      sorter: {}
    },
    {
      title: t("Actions"),
      dataIndex: "",
      align: "right",
      fixed: true,
      render: () => (
        <span>
          <Button type="link" icon={<EditOutlined />} />
          <Button type="link" icon={<DeleteOutlined />} />
        </span>
      )
    }
  ];

  useEffect(async () => {
    setTimeout(() => {
      setDate(mockedData);
      setLoading(false);
      setTotal(50);
    }, 1000);
  }, []);

  return (
    <Table
      size="small"
      className={styles.noTdPadding}
      columns={columns}
      loading={loading}
      dataSource={data}
      pagination={{
        current: currentPage,
        total,
        onChange: (page) => setCurrentPage(page)
      }}
    />
  );
}

export default CustomsTable;
