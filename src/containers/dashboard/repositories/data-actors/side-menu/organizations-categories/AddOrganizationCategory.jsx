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
  createOrgCategory,
  orgCategoriesListId
} from "../../../../../../services/repositories/data-actors/org-categories";

const { Item } = Form;

function AddOrganizationCategory(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createOrgCategory, {
    onSuccess: () => {
      success(t("Catégorie Organisation ajoutée"));
      discard();
      queryClient
        .invalidateQueries(orgCategoriesListId)
        .catch(() => refetchFailure(t));
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une catégorie d’organisation")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="code"
        label={t("Code cétégorie")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
    </AddRowForm>
  );
}

AddOrganizationCategory.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddOrganizationCategory;
