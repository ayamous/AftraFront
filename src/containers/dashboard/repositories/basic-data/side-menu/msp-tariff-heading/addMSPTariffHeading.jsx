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
import TariffHeadingsAutoComplete from "../tariff-heading/tariffHeadingsAutoComplete";
import MSPsAutoComplete from "../msp/MSPsAutoComplete";
import {
  createMSPtariffsRelation,
  MSPtariffsRelationsListId
} from "../../../../../../services/repositories/basic-data/msp-tariff-relations";

const { Item } = Form;

function AddMSPTariffHeading(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createMSPtariffsRelation, {
    onSuccess: () => {
      success(t("Relation position tarifaire - msp ajoutée"));
      queryClient
        .invalidateQueries(MSPtariffsRelationsListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une position tarifaire MSP")}
      onSubmit={(values) => {
        mutate(values);
      }}
      loading={isLoading}
    >
      <Item
        name="mspId"
        label={t("Référence de msp")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <MSPsAutoComplete />
      </Item>
      <Item
        name="tarifBookId"
        label={t("Référence de position tarifaire")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <TariffHeadingsAutoComplete />
      </Item>
    </AddRowForm>
  );
}

AddMSPTariffHeading.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddMSPTariffHeading;
