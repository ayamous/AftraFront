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
import SubProceduresAutoComplete from "../../../basic-data/side-menu/sub-procedures/subProceduresAutoComplete";
import DocumentsSetupAutoComplete from "../document-setup/documentSetepAutoComplete";
import {
  createDocumentSubProcedure,
  documentSubProceduresListId
} from "../../../../../../services/repositories/documents/sub-procedures";

const { Item } = Form;

function AddSubProcedure(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const values = {
    documentId: -1,
    subProcedureId: -1
  };

  const { isLoading, mutate } = useMutation(createDocumentSubProcedure, {
    onSuccess: () => {
      success(t("Document affecté au sous-procédure"));
      queryClient
        .invalidateQueries(documentSubProceduresListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une sous-procédure")}
      onSubmit={() => {
        mutate(values);
      }}
      loading={isLoading}
    >
      <Item
        name="documentId"
        label={t("Référence du document")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <DocumentsSetupAutoComplete
          onSelect={(x) => {
            values.documentId = x;
          }}
        />
      </Item>
      <Item
        name="subProcedureId"
        label={t("Référence du sous-procédure")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <SubProceduresAutoComplete
          onSelect={(x) => {
            values.subProcedureId = x;
          }}
        />
      </Item>
    </AddRowForm>
  );
}

AddSubProcedure.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddSubProcedure;
