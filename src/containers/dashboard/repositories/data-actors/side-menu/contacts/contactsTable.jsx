import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Input, Table } from "antd";
import { useMutation, useQueryClient } from "react-query";
import RowActions from "../../../../../../components/row-actions";
import RefetchButton from "../../../../../../components/reftech-button";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils/notify-user";
import {
  deleteContact,
  editOrgContact,
  contactsListId
} from "../../../../../../services/repositories/data-actors/contact";
import OrganisationAutoComplete from "../organizations/organisationAutoComplete";
import ContactTypes from "./contactTypes";
import OccupationTypes from "./occupationTypes";

function ContactsTable(props) {
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
      .invalidateQueries(contactsListId)
      .catch(() => refetchFailure(t));
  };

  // mutations
  const { isLoading: removing, mutate: remove } = useMutation(
    (id) => deleteContact(id),
    {
      onSuccess: () => onSuccess(t("Contact suprimé")),
      onError: () => operationFailed(t)
    }
  );
  const { isLoading: updating, mutate: update } = useMutation(
    (id) => editOrgContact(id, values),
    {
      onSuccess: () => {
        onSuccess(t("Contact modifié"));
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
      title: t("Nom"),
      dataIndex: "lastName",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.lastName = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Prénom"),
      dataIndex: "firstName",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.lastName = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("N° GSM"),
      dataIndex: "mobileNumber",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.mobileNumber = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("N° Fax"),
      dataIndex: "faxNumber",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.faxNumber = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("N° Téléphone"),
      dataIndex: "phoneNumber",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.phoneNumber = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Adresse"),
      dataIndex: "adress",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            onChange={(e) => {
              values.adress = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Email"),
      dataIndex: "email",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <Input
            defaultValue={text}
            type="email"
            onChange={(e) => {
              values.email = e.target.value;
            }}
          />
        );
      }
    },
    {
      title: t("Type"),
      dataIndex: "contactType",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <ContactTypes
            defaultValue={text}
            onSelect={(x) => {
              values.contactType = x;
            }}
          />
        );
      }
    },
    {
      title: t("Occupation"),
      dataIndex: "occupation",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <OccupationTypes
            defaultValue={text}
            onSelect={(x) => {
              values.occupation = x;
            }}
          />
        );
      }
    },
    {
      title: t("Organisation"),
      dataIndex: "organizationRef",
      editable: true,
      render: (text, { id }) => {
        const editRow = edit === id;
        if (!editRow) return text;
        return (
          <OrganisationAutoComplete
            defaultValue={text}
            onChange={(x) => {
              values.organizationRefId = x;
            }}
          />
        );
      }
    },
    {
      title: t("Actions"),
      dataIndex: "",
      align: "right",
      fixed: "right",
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

ContactsTable.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      reference: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      mobileNumber: PropTypes.string,
      phoneNumber: PropTypes.string,
      adress: PropTypes.string,
      email: PropTypes.string,
      faxNumber: PropTypes.string,
      contactType: PropTypes.string,
      occupation: PropTypes.string,
      organizationRef: PropTypes.string
    })
  ),
  total: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

ContactsTable.defaultProps = {
  data: null
};

export default ContactsTable;
