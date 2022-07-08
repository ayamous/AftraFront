import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  Form, Input, Switch, DatePicker
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "react-query";
import {
  formatDate,
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";
import AddRowForm from "../../../../../../components/add-row-form";
import {
  tariffVersionsListId,
  createTariffVersions
} from "../../../../../../services/repositories/basic-data/tariff-versions";
import StatusSelector from "./statusSelector";

const { Item } = Form;

function AddVersion(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const dates = {};

  const { isLoading, mutate } = useMutation(createTariffVersions, {
    onSuccess: () => {
      success(t("Version ajouté"));
      queryClient
        .invalidateQueries(tariffVersionsListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une version")}
      onSubmit={(values) => mutate({
        ...values,
        ...dates
      })}
      loading={isLoading}
    >
      <Item
        name="version"
        label={t("Numéro de version")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="number" min="0" />
      </Item>
      <Item name="enabled" label={t("Activé")}>
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Item>
      <Item
        name="status"
        label={t("statut de la version")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <StatusSelector />
      </Item>
      <Item name="_applicated_on" label={t("Date d’applicabilité")}>
        <DatePicker
          onChange={(date) => {
            dates.applicatedOn = formatDate(date);
          }}
        />
      </Item>
      <Item name="_validated_on" label={t("Date de validation")}>
        <DatePicker
          onChange={(date) => {
            dates.validatedOn = formatDate(date);
          }}
        />
      </Item>
      <Item name="_archived_on" label={t("Date d’archivage")}>
        <DatePicker
          onChange={(date) => {
            dates.archivedOn = formatDate(date);
          }}
        />
      </Item>
    </AddRowForm>
  );
}

AddVersion.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddVersion;
