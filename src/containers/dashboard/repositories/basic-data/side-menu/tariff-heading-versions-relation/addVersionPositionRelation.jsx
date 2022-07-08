import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form } from "antd";
import { useMutation, useQueryClient } from "react-query";
import AddRowForm from "../../../../../../components/add-row-form";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";
import {
  tariffVersionRelationsListId,
  createTariffRelation
} from "../../../../../../services/repositories/basic-data/tariff-version-ralations";
import TariffHeadingsAutoComplete from "../tariff-heading/tariffHeadingsAutoComplete";
import TariffVersionsAutoComplete from "../tariff-heading-versions/tariffVersionsAutoComplete";
import CountriesAutoComplete
  from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";

const { Item } = Form;

function AddVersionPositionRelation(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createTariffRelation, {
    onSuccess: () => {
      success(t("Relation position tarifaire - version ajoutée"));
      queryClient
        .invalidateQueries(tariffVersionRelationsListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une relation position tarifaire - version")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="tariffBookRefId"
        label={t("Référence du tariff book")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <TariffHeadingsAutoComplete />
      </Item>
      <Item
        name="versionRefId"
        label={t("Référence de la version")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <TariffVersionsAutoComplete />
      </Item>
      <Item
        name="countryRefId"
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

AddVersionPositionRelation.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddVersionPositionRelation;
