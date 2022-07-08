import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils/notify-user";
import {
  deleteDocumentDestinationCountry,
  documentDestinationCountryListId
} from "../../../../../../services/repositories/documents/destination-country";

const genID = (x, y) => `${x}-${y}`;

function ExportCountryTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(documentDestinationCountryListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (obj) => deleteDocumentDestinationCountry(obj),
    {
      onSuccess: () => onSuccess(t("Relation document - pays destination suprimée")),
      onError: () => operationFailed(t)
    }
  );

  const columns = [
    {
      title: t("Référence du document setup"),
      dataIndex: "documentReference"
    },
    {
      title: t("Référence du pays destination"),
      dataIndex: "countryReference"
    },
    {
      title: t("Actions"),
      dataIndex: "",
      fixed: "right",
      align: "right",
      render: (text, { documentId, countryId }) => (
        <RowActions
          id={genID(documentId, countryId)}
          remove={() => remove({ documentId, countryId })}
          loading={removing}
        />
      )
    }
  ];

  return (
    <>
      <Table
        size="small"
        rowKey={({ documentId, countryId }) => genID(documentId, countryId)}
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

ExportCountryTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      documentReference: PropTypes.string,
      countryReference: PropTypes.string,
      documentId: PropTypes.number,
      countryId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

ExportCountryTable.defaultProps = {
  data: null
};

export default ExportCountryTable;
