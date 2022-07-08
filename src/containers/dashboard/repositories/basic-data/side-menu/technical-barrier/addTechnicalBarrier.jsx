import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form, Input } from "antd";
import { useMutation, useQueryClient } from "react-query";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";
import AddRowForm from "../../../../../../components/add-row-form";
import { createTechnicalBarrier, technicalBarriersListId } from "../../../../../../services/repositories/basic-data/technical-barrier";
import DocumentsSetupAutoComplete
  from "../../../documents/side-menu/document-setup/documentSetepAutoComplete";
import CountriesAutoComplete
  from "../../../geographic-repositories/side-menu/countries/countriesAutoComplete";

const { Item } = Form;

function AddTechnicalBarrier(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createTechnicalBarrier, {
    onSuccess: () => {
      success(t("Barrière technique ajouté"));
      queryClient
        .invalidateQueries(technicalBarriersListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une barrière technique")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="code"
        label={t("Code")}
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

AddTechnicalBarrier.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddTechnicalBarrier;
