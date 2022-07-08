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
  MSPsListId,
  createMSP
} from "../../../../../../services/repositories/basic-data/msp";
import CountriesAutoComplete from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";
import DocumentsSetupAutoComplete from "../../../documents/side-menu/document-setup/documentSetepAutoComplete";

const { Item } = Form;

function AddMSP(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createMSP, {
    onSuccess: () => {
      success(t("MSP ajoutée"));
      queryClient
        .invalidateQueries(MSPsListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une MSP")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="code"
        label={t("Code de MSP")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="documentId"
        label={t("Référence du document")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <DocumentsSetupAutoComplete />
      </Item>
      <Item
        name="countryId"
        label={t("Référence du pays")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <CountriesAutoComplete />
      </Item>
    </AddRowForm>
  );
}

AddMSP.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddMSP;
