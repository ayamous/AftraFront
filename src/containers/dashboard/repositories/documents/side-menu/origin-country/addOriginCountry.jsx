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
  documentOriginCountryListId,
  createDocumentOriginCountry
} from "../../../../../../services/repositories/documents/origin-country";
import DocumentsSetupAutoComplete from "../document-setup/documentSetepAutoComplete";
import CountriesAutoComplete from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";

const { Item } = Form;

function AddOriginCountry(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const values = {
    documentId: -1,
    countryId: -1
  };

  const { isLoading, mutate } = useMutation(createDocumentOriginCountry, {
    onSuccess: () => {
      success(t("Document affecté au pays origine"));
      queryClient
        .invalidateQueries(documentOriginCountryListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Affecter un document à un pays d'origine")}
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
        name="countryId"
        label={t("Référence du pays")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <CountriesAutoComplete
          onSelect={(x) => {
            values.countryId = x;
          }}
        />
      </Item>
    </AddRowForm>
  );
}

AddOriginCountry.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddOriginCountry;
