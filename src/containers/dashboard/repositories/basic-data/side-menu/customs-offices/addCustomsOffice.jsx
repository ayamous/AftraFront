import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form, Input } from "antd";
import { useMutation, useQueryClient } from "react-query";
import AddRowForm from "../../../../../../components/add-row-form";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";
import {
  createOffice,
  officesListId
} from "../../../../../../services/repositories/basic-data/offices";
import CountriesAutoComplete
  from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";

const { Item } = Form;

function AddCustomsOffice(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createOffice, {
    onSuccess: () => {
      success(t("Bureau douane ajouté"));
      queryClient
        .invalidateQueries(officesListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un bureau douane")}
      onSubmit={(values) => {
        mutate(values);
      }}
      loading={isLoading}
    >
      <Item
        name="code"
        label={t("Code du bureau")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="countryId"
        label={t("Référence du pays")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <CountriesAutoComplete />
      </Item>
    </AddRowForm>
  );
}

AddCustomsOffice.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddCustomsOffice;
