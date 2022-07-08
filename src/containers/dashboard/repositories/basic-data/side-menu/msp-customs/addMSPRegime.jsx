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
  createMSPCustomsRelation,
  MSPCustomsRelationsListId
} from "../../../../../../services/repositories/basic-data/msp-customs-relations";
import CustomsAutoComplete
  from "../../../basic-repositories/side-menu/customs-regime/customsAutoComplete";
import MSPsAutoComplete from "../msp/MSPsAutoComplete";

const { Item } = Form;

function AddMSPRegime(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createMSPCustomsRelation, {
    onSuccess: () => {
      success(t("Relation régime douanier - msp ajoutée"));
      queryClient
        .invalidateQueries(MSPCustomsRelationsListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une relation régime douanier - msp")}
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
        name="customId"
        label={t("Référence de Régime")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <CustomsAutoComplete />
      </Item>
    </AddRowForm>
  );
}

AddMSPRegime.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddMSPRegime;
