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
  tariffTaxingRelationsListId,
  createTariffTaxingRelation
} from "../../../../../../services/repositories/basic-data/tariff-taxing-relations";
import TariffHeadingsAutoComplete from "../tariff-heading/tariffHeadingsAutoComplete";
import TaxingAutoComplete from "../taxing/taxingAutoComplete";

const { Item } = Form;

function AddTariffHeadingRelation(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const values = {
    countryRefId: -1,
    countryGroupRefId: -1
  };

  const { isLoading, mutate } = useMutation(createTariffTaxingRelation, {
    onSuccess: () => {
      success(t("Relation position tarifaire - taxation ajoutée"));
      queryClient
        .invalidateQueries(tariffTaxingRelationsListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une relation position tarifaire")}
      onSubmit={() => {
        mutate(values);
      }}
      loading={isLoading}
    >
      <Item
        name="tariffRefId"
        label={t("Référence tariff book")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <TariffHeadingsAutoComplete />
      </Item>
      <Item
        name="taxingRefId"
        label={t("Référence du taxation")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <TaxingAutoComplete />
      </Item>
    </AddRowForm>
  );
}

AddTariffHeadingRelation.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddTariffHeadingRelation;
