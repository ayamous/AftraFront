import React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { Input, Form } from "antd";
import PropTypes from "prop-types";
import AddRowForm from "../../../../components/add-row-form";
import { operationFailed, refetchFailure, success } from "../../../../utils";
import {
  createDocuments,
  eSafeDocumentsListID
} from "../../../../services/e-safe";

const { Item } = Form;
function AddFolder(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const onSuccess = (msg) => {
    success(msg);
    queryClient
      .invalidateQueries(eSafeDocumentsListID)
      .catch(() => refetchFailure(t));
  };
  const { isLoading, mutate } = useMutation(createDocuments, {
    onSuccess: () => onSuccess(t("Dossier ajouté")),
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un nouveau dossier")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="fileName"
        label={t("folder's name")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
    </AddRowForm>
  );
}

AddFolder.propTypes = {
  discard: PropTypes.func.isRequired
};
export default AddFolder;
