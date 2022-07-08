import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form } from "antd";
import { useMutation, useQueryClient } from "react-query";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";
import AddRowForm from "../../../../../../components/add-row-form";
import {
  countryGroupRelationsListId,
  createCountryGroupRelation
} from "../../../../../../services/repositories/geographic-repositories/country-group-relations";
import CountriesGroupAutoComplete from "../country-groups/countriesgroupsAutoComplete";
import CountriesAutoComplete from "../countries/countriesAutoComplete";

const { Item } = Form;

function AddCountryGroupRelation(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createCountryGroupRelation, {
    onSuccess: () => {
      success(t("Relation pays-groupement ajoutée"));
      queryClient
        .invalidateQueries(countryGroupRelationsListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Affecter un pays à un groupement")}
      onSubmit={(values) => {
        mutate(values);
      }}
      loading={isLoading}
    >
      <Item
        name="countryRefId"
        label={t("Pays")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <CountriesAutoComplete />
      </Item>
      <Item
        name="countryGroupRefId"
        label={t("Groupement")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <CountriesGroupAutoComplete />
      </Item>
    </AddRowForm>
  );
}

AddCountryGroupRelation.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddCountryGroupRelation;
