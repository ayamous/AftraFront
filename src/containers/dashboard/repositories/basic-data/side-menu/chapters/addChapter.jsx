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
  chaptersListId,
  createChapter
} from "../../../../../../services/repositories/basic-data/chapters";
import SectionsAutoComplete from "../sections/sectionsAutoComplete";

const { Item } = Form;

function AddChapter(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createChapter, {
    onSuccess: () => {
      success(t("Chapitre ajouté"));
      queryClient
        .invalidateQueries(chaptersListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un chapitre")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="code"
        label={t("Code du chapitre")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="sectionId"
        label={t("Référence section")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <SectionsAutoComplete />
      </Item>
    </AddRowForm>
  );
}

AddChapter.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddChapter;
