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
  createCurrency,
  currenciesListId
} from "../../../../../../services/repositories/basic-repositories/currencies";

const { Item } = Form;

function AddCurrency(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createCurrency, {
    onSuccess: () => {
      success(t("Devise ajoutée"));
      queryClient
        .invalidateQueries(currenciesListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  const addCurrency = (values) => mutate(values);

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une devise")}
      onSubmit={addCurrency}
      loading={isLoading}
    >
      <Item
        name="code"
        label={t("Code de la devise")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
    </AddRowForm>
  );
}

AddCurrency.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddCurrency;
