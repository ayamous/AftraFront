import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Input, Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RefetchButton from "../../../../../../components/reftech-button";
import RowActions from "../../../../../../components/row-actions";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";
import {
  organisationsListId,
  deleteOrganisation,
  editOrganisation
} from "../../../../../../services/repositories/data-actors/organisations";
import OrgCategoriesAutoComplete from "../organizations-categories/orgCategoriesAutoComplete";
import CitiesAutoComplete from "../../../geographic-repositories/side-menu/cities/citiesAutoComplete";

function OrganizationsTable(props) {
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
      .invalidateQueries(organisationsListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteOrganisation(id),
    {
      onSuccess: () => onSuccess(t("Organisation suprimée")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editOrganisation(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Organisation modifiée"));
        setEdit(-1);
      },
      onError: () => operationFailed(t)
    }
  );

  const columns = [
    {
      title: t("Référence"),
      dataIndex: "reference",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.reference = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Acronyme"),
      dataIndex: "acronym",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.acronym = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Nom"),
      dataIndex: "name",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.name = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Organisation parente"),
      dataIndex: "parentReference",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <OrgCategoriesAutoComplete
            defaultValue={id}
            onSelect={(x) => {
              values.parentId = x;
            }}
          />
        );
      }
    },
    {
      title: t("ville"),
      dataIndex: "cityReference",
      editable: true,
      render: (text, { id, cityId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <CitiesAutoComplete
            defaultValue={cityId}
            onSelect={(x) => {
              values.cityId = x;
            }}
          />
        );
      }
    },
    {
      title: t("Catégorie"),
      dataIndex: "categoryCode",
      editable: true,
      render: (text, { id, categoryId }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <OrgCategoriesAutoComplete
            defaultValue={categoryId}
            onSelect={(x) => {
              values.categoryId = x;
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
      render: (text, { id }) => {
        const editRow = edit === id;
        return (
          <RowActions
            id={id}
            edit={() => setEdit(id)}
            cancelEdit={() => setEdit(-1)}
            update={() => update(id)}
            inEdit={editRow}
            remove={() => remove(id)}
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

OrganizationsTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      reference: PropTypes.string,
      acronym: PropTypes.string,
      name: PropTypes.string,
      parentReference: PropTypes.string,
      parentId: PropTypes.number,
      cityReference: PropTypes.string,
      cityId: PropTypes.number,
      categoryCode: PropTypes.string,
      categoryId: PropTypes.number
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

OrganizationsTable.defaultProps = {
  data: null
};

export default OrganizationsTable;
