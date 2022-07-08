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
  createTransportationType,
  transportationTypesListId
} from "../../../../../../services/repositories/basic-repositories/transporation-types";

const { Item } = Form;

function AddTransportationType(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createTransportationType, {
    onSuccess: () => {
      success(t("Type de transportation ajouté"));
      queryClient
        .invalidateQueries(transportationTypesListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un type de transportation")}
      onSubmit={(values) => mutate(values)}
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
    </AddRowForm>
  );
}

AddTransportationType.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddTransportationType;
