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
  createDeclarationType,
  declarationTypesListId
} from "../../../../../../services/repositories/basic-repositories/declaration-types";

function AddDeclarationType(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createDeclarationType, {
    onSuccess: () => {
      success(t("Type de déclaration ajouté"));
      queryClient
        .invalidateQueries(declarationTypesListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un type de déclaration")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Form.Item
        name="code"
        label={t("Code de type")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Form.Item>
    </AddRowForm>
  );
}

AddDeclarationType.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddDeclarationType;
