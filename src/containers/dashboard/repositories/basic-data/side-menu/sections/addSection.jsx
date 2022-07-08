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
import {
  createSection,
  sectionsListId
} from "../../../../../../services/repositories/basic-data/sections";

const { Item } = Form;

function AddSection(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createSection, {
    onSuccess: () => {
      success(t("Section ajoutée"));
      discard();
      queryClient
        .invalidateQueries(sectionsListId)
        .catch(() => refetchFailure(t));
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une section")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="code"
        label={t("Code de la section")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
    </AddRowForm>
  );
}

AddSection.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddSection;
