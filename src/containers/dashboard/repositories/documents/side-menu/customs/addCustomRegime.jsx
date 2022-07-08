import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form } from "antd";
import { useMutation, useQueryClient } from "react-query";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";
import AddRowForm from "../../../../../../components/add-row-form";
import {
  createDocumentCustom,
  documentCustomListId
} from "../../../../../../services/repositories/documents/customs";
import DocumentsSetupAutoComplete from "../document-setup/documentSetepAutoComplete";
import CustomsAutoComplete from "../../../basic-repositories/side-menu/customs-regime/customsAutoComplete";

const { Item } = Form;

function AddCustomRegime(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const values = {
    documentSetupId: -1,
    customsRegimId: -1
  };

  const { isLoading, mutate } = useMutation(createDocumentCustom, {
    onSuccess: () => {
      success(t("Document affecté au régime douanier"));
      queryClient
        .invalidateQueries(documentCustomListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Affecter un Régime douanier au document")}
      onSubmit={() => {
        mutate(values);
      }}
      loading={isLoading}
    >
      <Item
        name="documentSetupId"
        label={t("Référence du document")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <DocumentsSetupAutoComplete
          onSelect={(x) => {
            values.documentSetupId = x;
          }}
        />
      </Item>
      <Item
        name="customsRegimId"
        label={t("Référence du régime douanier")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <CustomsAutoComplete
          onSelect={(x) => {
            values.customsRegimId = x;
          }}
        />
      </Item>
    </AddRowForm>
  );
}

AddCustomRegime.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddCustomRegime;
