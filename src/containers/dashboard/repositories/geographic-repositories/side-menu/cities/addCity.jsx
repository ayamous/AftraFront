import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form, Input } from "antd";
import { useMutation, useQueryClient } from "react-query";
import AddRowForm from "../../../../../../components/add-row-form";
import {
  refetchFailure,
  operationFailed,
  success
} from "../../../../../../utils";
import {
  citiesListId,
  createCity
} from "../../../../../../services/repositories/geographic-repositories/cities";
import CountriesAutoComplete from "../countries/countriesAutoComplete";

const { Item } = Form;

function AddCity(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const countryRef = {
    id: -1
  };

  const { isLoading, mutate } = useMutation(createCity, {
    onSuccess: () => {
      success(t("Ville ajoutée"));
      queryClient
        .invalidateQueries(citiesListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une ville")}
      onSubmit={({ reference }) => mutate({ reference, countryRefId: countryRef.id })}
      loading={isLoading}
    >
      <Item
        name="reference"
        label={t("Référence et identifiant ville")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="countryRefId"
        label={t("Référence du pays de la ville")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <CountriesAutoComplete
          onSelect={(x) => {
            countryRef.id = x;
          }}
        />
      </Item>
    </AddRowForm>
  );
}

AddCity.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddCity;
