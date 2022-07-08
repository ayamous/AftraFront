import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form, Input } from "antd";
import { useMutation, useQueryClient } from "react-query";
import AddRowForm from "../../../../../../components/add-row-form";
import {
  refetchFailure,
  operationFailed,
  success
} from "../../../../../../utils";
import {
  createDocumentsSetup,
  documentsSetupListId
} from "../../../../../../services/repositories/documents/documents-setup";

const { Item } = Form;

function AddDocumentSetUp(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createDocumentsSetup, {
    onSuccess: () => {
      success(t("Document setup ajoutée"));
      discard();
      queryClient
        .invalidateQueries(documentsSetupListId)
        .catch(() => refetchFailure(t));
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un document setup")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="code"
        label={t("Code du Document")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="techReference"
        label={t("Référence technique")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="docName"
        label={t("Nom du document")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item name="scope" label={t("Porté du document")}>
        <Input type="text" />
      </Item>
    </AddRowForm>
  );
}

AddDocumentSetUp.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddDocumentSetUp;
