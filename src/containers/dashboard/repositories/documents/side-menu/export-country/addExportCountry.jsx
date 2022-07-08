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
  createDocumentDestinationCountry,
  documentDestinationCountryListId
} from "../../../../../../services/repositories/documents/destination-country";
import CountriesAutoComplete from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";
import DocumentsSetupAutoComplete from "../document-setup/documentSetepAutoComplete";

const { Item } = Form;

function AddExportCountry(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const values = {
    documentId: -1,
    countryId: -1
  };

  const { isLoading, mutate } = useMutation(createDocumentDestinationCountry, {
    onSuccess: () => {
      success(t("Document affecté au pays destination"));
      queryClient
        .invalidateQueries(documentDestinationCountryListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un pays destination")}
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
        name="countryId"
        label={t("Référence du pays destination")}
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

AddExportCountry.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddExportCountry;
