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
  createTCTariffsRelation,
  TCTariffsRelationsListId
} from "../../../../../../services/repositories/basic-data/technical-barrier-tariff-relations";
import TariffHeadingsAutoComplete from "../tariff-heading/tariffHeadingsAutoComplete";
import TechBarriersAutoComplete from "../technical-barrier/techBarriersAutoComplete";

const { Item } = Form;

function AddTechnicalBarrierTariffHeadingRelation(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createTCTariffsRelation, {
    onSuccess: () => {
      success(t("Relation position tarifaire - barrière technique ajoutée"));
      queryClient
        .invalidateQueries(TCTariffsRelationsListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une relation barrière technique - position")}
      onSubmit={(values) => {
        mutate(values);
      }}
      loading={isLoading}
    >
      <Item
        name="techBarrierRefId"
        label={t("Référence du barrière technique")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <TechBarriersAutoComplete />
      </Item>
      <Item
        name="tariffBookRefs"
        label={t("Référence du position tarifaire")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <TariffHeadingsAutoComplete />
      </Item>
    </AddRowForm>
  );
}

AddTechnicalBarrierTariffHeadingRelation.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddTechnicalBarrierTariffHeadingRelation;
