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
  taxingListId,
  createTaxing
} from "../../../../../../services/repositories/basic-data/taxing";
import CountriesAutoComplete from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";
import CustomsAutoComplete from "../../../basic-repositories/side-menu/customs-regime/customsAutoComplete";
import TaxTypesAutoComplete from "../tax-types/taxTypesAutoComplete";
import MeasureUnitsAutoComplete from "../../../basic-repositories/side-menu/measure-units/measureUnitsAutoComplete";

const { Item } = Form;

function AddTaxing(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createTaxing, {
    onSuccess: () => {
      success(t("Taxation ajoutée"));
      queryClient
        .invalidateQueries(taxingListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une taxation")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="reference"
        label={t("Référence")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="rate"
        label={t("Taux imposition")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>

      <Item
        name="value"
        label={t("Valeur imposition")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="countryRefId"
        label={t("Référence pays")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <CountriesAutoComplete />
      </Item>
      <Item
        name="customRegimeRefId"
        label={t("Référence régime douanier")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <CustomsAutoComplete />
      </Item>
      <Item
        name="unitRefId"
        label={t("Référence unité")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <MeasureUnitsAutoComplete />
      </Item>
      <Item
        name="taxRefId"
        label={t("Référence du taxation")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <TaxTypesAutoComplete />
      </Item>
    </AddRowForm>
  );
}

AddTaxing.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddTaxing;
