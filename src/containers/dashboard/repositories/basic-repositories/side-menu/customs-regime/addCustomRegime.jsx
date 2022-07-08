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
import RegimeTypesSelect from "./regimeTypesSelect";
import {
  createCustomRegime,
  customRegimeListId
} from "../../../../../../services/repositories/basic-repositories/customs-regimes";

const { Item } = Form;

function AddCustomRegime(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createCustomRegime, {
    onSuccess: () => {
      success(t("Régime douanier ajouté"));
      queryClient
        .invalidateQueries(customRegimeListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un régime douanier")}
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
        name="regimType"
        label={t("type")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <RegimeTypesSelect />
      </Item>
    </AddRowForm>
  );
}

AddCustomRegime.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddCustomRegime;
