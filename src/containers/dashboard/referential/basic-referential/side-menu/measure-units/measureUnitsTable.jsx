import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useTranslation } from "react-i18next";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styles from "../sharedStyles.module.scss";

import mockedData from "./mockData";

function MeasureUnitsTable() {
  const { t } = useTranslation();
  const [data, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const columns = [
    {
      title: t("Code"),
      dataIndex: "code",
      width: 100,
      sorter: {}
    },
    {
      title: t("Description"),
      dataIndex: "description",
      sorter: {},
      ellipsis: true
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
      rowKey={(record) => record.code}
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

export default MeasureUnitsTable;
