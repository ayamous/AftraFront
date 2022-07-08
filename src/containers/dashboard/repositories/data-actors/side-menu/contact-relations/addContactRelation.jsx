import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Form } from "antd";
import { useMutation, useQueryClient } from "react-query";
import {
  operationFailed,
  refetchFailure,
  success
} from "../../../../../../utils";
import AddRowForm from "../../../../../../components/add-row-form";
import {
  createContactUserRelation,
  contactUserRelationsListId
} from "../../../../../../services/repositories/data-actors/user-contact-relation";
import UsersAutoComplete from "../users/usersAutoComplete";
import ContactsAutoComplete from "../contacts/contactsAutoComplete";

const { Item } = Form;

function AddContactRelation(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createContactUserRelation, {
    onSuccess: () => {
      success(t("Relation contact-utilisateur ajoutée"));
      queryClient
        .invalidateQueries(contactUserRelationsListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });
  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une relation contact-utilisateur")}
      onSubmit={(values) => mutate(values)}
      loading={isLoading}
    >
      <Item
        name="contactId"
        label={t("Référence du contact")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <UsersAutoComplete />
      </Item>
      <Item
        name="userId"
        label={t("Référence d’utilisateur")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <ContactsAutoComplete />
      </Item>
    </AddRowForm>
  );
}

AddContactRelation.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddContactRelation;
