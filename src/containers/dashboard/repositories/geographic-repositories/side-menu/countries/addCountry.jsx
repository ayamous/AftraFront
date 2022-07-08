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
  createCountry,
  countriesListId
} from "../../../../../../services/repositories/geographic-repositories/countries";

const { Item } = Form;

function AddCountry(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createCountry, {
    onSuccess: () => {
      success(t("Pays ajouté"));
      queryClient
        .invalidateQueries(countriesListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un pays")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="reference"
        label={t("Référence et identifiant pays")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="codeIso"
        label={t("Code ISO du pays")}
        required
        rules={[
          { required: true, message: t("Champ requis") },
          { max: 2, message: t("Il faut exactement 2 caractères") },
          { min: 2, message: t("Il faut exactement 2 caractères") }
        ]}
        hasFeedback
      >
        <Input type="text" maxLength={2} />
      </Item>
    </AddRowForm>
  );
}

AddCountry.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddCountry;
