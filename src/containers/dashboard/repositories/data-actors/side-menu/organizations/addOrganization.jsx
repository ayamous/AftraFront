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
  createOrganisation,
  organisationsListId
} from "../../../../../../services/repositories/data-actors/organisations";
import OrganisationAutoComplete from "./organisationAutoComplete";
import CitiesAutoComplete from "../../../geographic-repositories/side-menu/cities/citiesAutoComplete";
import OrgCategoriesAutoComplete from "../organizations-categories/orgCategoriesAutoComplete";

const { Item } = Form;

function AddOrganization(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createOrganisation, {
    onSuccess: () => {
      success(t("Organisation ajoutée"));
      discard();
      queryClient
        .invalidateQueries(organisationsListId)
        .catch(() => refetchFailure(t));
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une organisation")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="reference"
        label={t("Référence")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="name"
        label={t("Nom")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="acronym"
        label={t("Acronyme")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item name="parentId" label={t("Origanisation parente")}>
        <OrganisationAutoComplete />
      </Item>
      <Item name="cityId" label={t("Ville")}>
        <CitiesAutoComplete />
      </Item>
      <Item name="categoryId" label={t("Catégorie d’organisation")}>
        <OrgCategoriesAutoComplete />
      </Item>
    </AddRowForm>
  );
}

AddOrganization.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddOrganization;
