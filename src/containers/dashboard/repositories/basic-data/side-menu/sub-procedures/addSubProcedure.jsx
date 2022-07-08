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
  createSubProcedure,
  subProceduresListId
} from "../../../../../../services/repositories/basic-data/sub-procedures";
import ProceduresAutoComplete from "../procedures/proceduresAutoComplete";

const { Item } = Form;

function AddSubProcedure(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createSubProcedure, {
    onSuccess: () => {
      success(t("Procédure ajoutée"));
      queryClient
        .invalidateQueries(subProceduresListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une sous-procédure")}
      onSubmit={(values) => {
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
        <Input type="text" />
      </Item>
      <Item
        name="procedureId"
        label={t("Référence du pays")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <ProceduresAutoComplete />
      </Item>
    </AddRowForm>
  );
}

AddSubProcedure.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddSubProcedure;
