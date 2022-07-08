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
  createDocumentProcedure,
  documentProceduresListId
} from "../../../../../../services/repositories/documents/procedures";
import DocumentsSetupAutoComplete from "../document-setup/documentSetepAutoComplete";
import ProceduresAutoComplete from "../../../basic-data/side-menu/procedures/proceduresAutoComplete";

const { Item } = Form;

function AddProcedure(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const values = {
    documentId: -1,
    procedureId: -1
  };

  const { isLoading, mutate } = useMutation(createDocumentProcedure, {
    onSuccess: () => {
      success(t("Document affecté au procédure"));
      queryClient
        .invalidateQueries(documentProceduresListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter procédure")}
      onSubmit={() => {
        mutate(values);
      }}
      loading={isLoading}
    >
      <Item
        name="documentId"
        label={t("Référence du document setup")}
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
        name="procedureId"
        label={t("Référence du procédure")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <ProceduresAutoComplete
          onSelect={(x) => {
            values.procedureId = x;
          }}
        />
      </Item>
    </AddRowForm>
  );
}

AddProcedure.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddProcedure;
