import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Input, Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";
import {
  agreementsListId,
  deleteAgreement,
  editAgreement
} from "../../../../../../services/repositories/basic-data/trade-agreements";
import DocumentsSetupAutoComplete from "../../../documents/side-menu/document-setup/documentSetepAutoComplete";
import CountriesGroupAutoComplete
  from "../../../geographic-repositories/side-menu/country-groups/countriesgroupsAutoComplete";
import CountriesAutoComplete
  from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";

function TradeAgreementsTable(props) {
  const {
    error, data, loading, total, current, setPage, refetch
  } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(-1);
  const values = {};

  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(agreementsListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteAgreement(id),
    {
      onSuccess: () => onSuccess(t("Accord commercial suprimé")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editAgreement(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Accord commercial modifié"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );
  const columns = [
    {
      title: t("Code agreement"),
      dataIndex: "code",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.code = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Titre de l’accord"),
      dataIndex: "title",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.title = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Description de l’accord"),
      dataIndex: "description",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.description = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Réferance document"),
      dataIndex: "documentSetupRef",
      editable: true,
      render: (text, { id, documentSetupRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <DocumentsSetupAutoComplete
            defaultValue={documentSetupRefId}
            onSelect={(x) => {
              values.documentId = x;
            }}
          />
        );
      }
    },
    {
      title: t("Référence groupement"),
      dataIndex: "countryGroupRef",
      editable: true,
      render: (text, { id, countryGroupRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <CountriesGroupAutoComplete
            defaultValue={countryGroupRefId}
            onSelect={(x) => {
              values.GroupId = x;
            }}
          />
        );
      }
    },
    {
      title: t("Référence du pays"),
      dataIndex: "countryRef",
      editable: true,
      render: (text, { id, countryRefId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <CountriesAutoComplete
            defaultValue={countryRefId}
            onSelect={(x) => {
              values.countryId = x;
            }}
          />
        );
      }
    },
    {
      title: t("Actions"),
      dataIndex: "",
      fixed: "right",
      align: "right",
      render: (text, { chapterRefId }) => {
        const editRow = edit === chapterRefId;
        return (
          <RowActions
            id={chapterRefId}
            edit={() => setEdit(chapterRefId)}
            cancelEdit={() => setEdit(-1)}
            update={() => update(chapterRefId)}
            inEdit={editRow}
            remove={() => remove(chapterRefId)}
            loading={editRow && (removing || updating)}
          />
        );
      }
    }
  ];

  return (
    <>
      <Table
        size="small"
        rowKey={({ id }) => id}
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

TradeAgreementsTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      documentSetupRef: PropTypes.string,
      documentSetupRefId: PropTypes.number,
      countryRef: PropTypes.string,
      countryRefId: PropTypes.number,
      countryGroupRef: PropTypes.string,
      countryGroupRefId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

TradeAgreementsTable.defaultProps = {
  data: null
};

export default TradeAgreementsTable;
