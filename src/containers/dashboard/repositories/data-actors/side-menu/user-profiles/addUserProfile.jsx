import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form, Input, Switch } from "antd";
import { useMutation, useQueryClient } from "react-query";
import AddRowForm from "../../../../../../components/add-row-form";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";
import {
  createUserProfile,
  usersProfilesListId
} from "../../../../../../services/repositories/data-actors/user-profiles";

const { Item } = Form;
const { TextArea } = Input;
function AddUserProfile(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createUserProfile, {
    onSuccess: () => {
      success(t("Profil utlisateur ajouté"));
      discard();
      queryClient
        .invalidateQueries(usersProfilesListId)
        .catch(() => refetchFailure(t));
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un profil utilisateur")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="reference"
        label={t("Référence du profil")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="name"
        label={t("Nom du profil")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="rank"
        label={t("Rang du profil")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="number" />
      </Item>
      <Item name="enabled" label={t("Activé?")}>
        <Switch />
      </Item>
      <Item name="description" label={t("Description")}>
        <TextArea />
      </Item>
    </AddRowForm>
  );
}

AddUserProfile.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddUserProfile;
