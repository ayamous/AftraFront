import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form, Input } from "antd";
import { useMutation, useQueryClient } from "react-query";
import AddRowForm from "../../../../../../components/add-row-form";
import {
  operationFailed,
  success,
  refetchFailure
} from "../../../../../../utils";
import {
  createMeasureUnit,
  measureUnitsListId
} from "../../../../../../services/repositories/basic-repositories/measure-units";

const { Item } = Form;

function AddMeasureUnit(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createMeasureUnit, {
    onSuccess: () => {
      success(t("Unité de mesure ajoutée"));
      queryClient
        .invalidateQueries(measureUnitsListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une unité de mesure")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="code"
        label={t("Code unité de mesure")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
    </AddRowForm>
  );
}

AddMeasureUnit.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddMeasureUnit;
