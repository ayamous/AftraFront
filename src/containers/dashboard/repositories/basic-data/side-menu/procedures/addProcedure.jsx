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
  createProcedure,
  proceduresListId
} from "../../../../../../services/repositories/basic-data/procedures";
import CountriesAutoComplete from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";
import CustomsAutoComplete from "../../../basic-repositories/side-menu/customs-regime/customsAutoComplete";

const { Item } = Form;

function AddProcedure(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const values = {
    code: "",
    countryRefId: -1,
    customsRegimRefId: -1
  };

  const { isLoading, mutate } = useMutation(createProcedure, {
    onSuccess: () => {
      success(t("Procédure ajoutée"));
      queryClient
        .invalidateQueries(proceduresListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une procédure")}
      onSubmit={() => {
        mutate(values);
      }}
      loading={isLoading}
    >
      <Item
        name="code"
        label={t("Code")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input
          type="text"
          onChange={(e) => {
            values.code = e.target.value;
          }}
        />
      </Item>
      <Item
        name="ref_country"
        label={t("Référence du pays")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <CountriesAutoComplete
          onSelect={(x) => {
            values.countryRefId = x;
          }}
        />
      </Item>

      <Item
        name="customsRegimRefId"
        label={t("Référence du régime")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <CustomsAutoComplete
          onSelect={(x) => {
            values.customsRegimRefId = x;
          }}
        />
      </Item>
    </AddRowForm>
  );
}

AddProcedure.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddProcedure;
