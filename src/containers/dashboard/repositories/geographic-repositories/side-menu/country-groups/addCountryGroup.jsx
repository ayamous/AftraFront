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
  countriesGroupListId,
  createCountriesGroup
} from "../../../../../../services/repositories/geographic-repositories/countries-group";

const { Item } = Form;

function AddCountryGroup(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createCountriesGroup, {
    onSuccess: () => {
      success(t("Groupe des pays ajouté"));
      queryClient
        .invalidateQueries(countriesGroupListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un groupement des pays")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="reference"
        label={t("Référence groupement de pays")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="code"
        label={t("Code groupement")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
    </AddRowForm>
  );
}

AddCountryGroup.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddCountryGroup;
