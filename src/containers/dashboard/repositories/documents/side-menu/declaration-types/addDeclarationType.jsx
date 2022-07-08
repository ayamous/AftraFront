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
  createDeclarationType,
  declarationTypesListId
} from "../../../../../../services/repositories/documents/declaration-types";
import DocumentsSetupAutoComplete from "../document-setup/documentSetepAutoComplete";
import DeclarationTypesAutoComplete from "../../../basic-repositories/side-menu/declaration-types/declarationTypesAutoComplete";

const { Item } = Form;

function AddDeclarationType(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const values = {
    documentSetupRefId: -1,
    declarationTypeRefId: -1
  };

  const { isLoading, mutate } = useMutation(createDeclarationType, {
    onSuccess: () => {
      success(t("Document affecté au type de declaration"));
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
      onSubmit={() => {
        mutate(values);
      }}
      loading={isLoading}
    >
      <Item
        name="documentSetupRefId"
        label={t("Référence du document setup")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <DocumentsSetupAutoComplete
          onSelect={(x) => {
            values.documentSetupRefId = x;
          }}
        />
      </Item>
      <Item
        name="declarationTypeRefId"
        label={t("Référence du type de déclaration")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <DeclarationTypesAutoComplete
          onSelect={(x) => {
            values.declarationTypeRefId = x;
          }}
        />
      </Item>
    </AddRowForm>
  );
}

AddDeclarationType.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddDeclarationType;
