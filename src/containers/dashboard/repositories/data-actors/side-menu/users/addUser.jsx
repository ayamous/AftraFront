import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form, Input, DatePicker } from "antd";
import { useMutation, useQueryClient } from "react-query";
import {
  formatDate,
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";
import AddRowForm from "../../../../../../components/add-row-form";
import {
  createUser,
  usersListId
} from "../../../../../../services/repositories/data-actors/users";
import UsersProfilesAutoComplete from "../user-profiles/usersProfilesAutoComplete";
import StatusTypes from "./statusTypes";

const { Item } = Form;

function AddUser(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const dates = {
    temporalPwdExpDate: ""
  };

  const { isLoading, mutate } = useMutation(createUser, {
    onSuccess: () => {
      success(t("Utilisateur ajouté"));
      queryClient.invalidateQueries(usersListId).catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un utilisateur")}
      onSubmit={(values) => mutate({
        ...values,
        ...dates
      })}
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
        name="login"
        label={t("Login")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="password"
        label={t("Mot de passe")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="temporalPwd"
        label={t("Mot de passe temporaire")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="temporalPwdExpDate"
        label={t("Mot de passe temporaire")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <DatePicker
          onChange={(date) => {
            dates.temporalPwdExpDate = formatDate(date);
          }}
        />
      </Item>
      <Item
        name="status"
        label={t("statut")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <StatusTypes />
      </Item>
      <Item
        name="profileId"
        label={t("Profil utilisateur")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <UsersProfilesAutoComplete />
      </Item>
    </AddRowForm>
  );
}

AddUser.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddUser;
