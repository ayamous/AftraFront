import React from "react";
import PropTypes from "prop-types";
import { Trans, useTranslation } from "react-i18next";
import { Table } from "antd";
import { formatDate } from "../../../../../../utils";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";

function SafetyTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();

  const columns = [
    {
      title: t("Code"),
      dataIndex: "code",
      sorter: {}
    },
    {
      title: t("Nom"),
      dataIndex: "name",
      sorter: {}
    },
    {
      title: t("Répertoire"),
      dataIndex: "repository",
      sorter: {}
    },
    {
      title: t("Favori"),
      dataIndex: "isFavorite",
      sorter: {},
      render: (val) => <Trans>{val ? t("Oui") : t("Non")}</Trans>
    },
    {
      title: t("Document partageable"),
      dataIndex: "isDocumentShareable",
      sorter: {},
      render: (val) => <Trans>{val ? t("Oui") : t("Non")}</Trans>
    },
    {
      title: t("Répertoire partageable"),
      dataIndex: "isRepositoryShareable",
      sorter: {},
      render: (val) => <Trans>{val ? t("Oui") : t("Non")}</Trans>
    },
    {
      title: t("Date d’expiration"),
      dataIndex: "expirationDate",
      sorter: {},
      render: (val) => <span>{formatDate(val)}</span>
    },
    {
      title: t("Taille"),
      dataIndex: "size",
      sorter: {},
      render: (val) => (
        <span>
          {val}
          Ko
        </span>
      )
    },
    {
      title: t("Actions"),
      dataIndex: "",
      align: "right",
      fixed: true,
      render: () => <RowActions edit={() => {}} remove={() => {}} />
    }
  ];

  return (
    <>
      <Table
        size="small"
        rowKey={({ code }) => code}
        columns={columns}
        loading={loading}
        dataSource={data}
        pagination={{
          current,
          total,
          onChange: (page) => setPage(page - 1)
        }}
      />
      {error && <RefetchButton refetch={refetch} />}
    </>
  );
}

SafetyTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
      default: PropTypes.string
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

SafetyTable.defaultProps = {
  data: null
};

export default SafetyTable;
