import React from "react";
import { Table } from "antd";
import { useTranslation } from "react-i18next";

import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import RefetchButton from "../../../../../../components/reftech-button";
import RowActions from "../../../../../../components/row-actions";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils/notify-user";
import {
  contactUserRelationsListId,
  deleteContactUserRelation
} from "../../../../../../services/repositories/data-actors/user-contact-relation";

const genID = (x, y) => `${x}-${y}`;

function ContactRelationsTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(contactUserRelationsListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (obj) => deleteContactUserRelation(obj),
    {
      onSuccess: () => onSuccess(t("Relation contact-utilisateur suprimée")),
      onError: () => operationFailed(t)
    }
  );
  const columns = [
    {
      title: t("Référence du contact"),
      dataIndex: "contactReference"
    },
    {
      title: t("Référence d’utilisateur"),
      dataIndex: "userAccountReference"
    },
    {
      title: t("Actions"),
      dataIndex: "",
      fixed: "right",
      align: "right",
      render: (text, { contactId, userId }) => (
        <RowActions
          id={genID(contactId, userId)}
          remove={() => remove({ contactId, userId })}
          loading={removing}
        />
      )
    }
  ];

  return (
    <>
      <Table
        size="small"
        rowKey={({ contactId, userId }) => genID(contactId, userId)}
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

ContactRelationsTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      contactId: PropTypes.number,
      userId: PropTypes.number,
      contactReference: PropTypes.string,
      userAccountReference: PropTypes.string
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

ContactRelationsTable.defaultProps = {
  data: null
};

export default ContactRelationsTable;
