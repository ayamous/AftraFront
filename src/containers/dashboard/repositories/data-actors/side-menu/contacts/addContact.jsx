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
import OrganisationAutoComplete from "../organizations/organisationAutoComplete";
import ContactTypes from "./contactTypes";
import {
  createContact,
  contactsListId
} from "../../../../../../services/repositories/data-actors/contact";
import OccupationTypes from "./occupationTypes";

const { Item } = Form;

function AddContact(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(createContact, {
    onSuccess: () => {
      success(t("Contact ajouté"));
      queryClient
        .invalidateQueries(contactsListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter un contact")}
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
        name="lastName"
        label={t("Nom")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="firstName"
        label={t("Prénom")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item name="mobileNumber" label={t("N° GSM")}>
        <Input type="text" />
      </Item>
      <Item name="phoneNumber" label={t("N° Téléphone")}>
        <Input type="text" />
      </Item>
      <Item name="address" label={t("Adresse")}>
        <Input type="text" />
      </Item>
      <Item
        name="email"
        label={t("email")}
        rules={[
          {
            type: "email",
            message: t("Adresse email invalide")
          }
        ]}
        hasFeedback
      >
        <Input type="email" />
      </Item>
      <Item name="faxNumber" label={t("N° Fax")}>
        <Input type="text" />
      </Item>
      <Item
        name="contactType"
        label={t("Type de Contact")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <ContactTypes />
      </Item>
      <Item
        name="occupation"
        label={t("Occupation")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <OccupationTypes />
      </Item>
      <Item
        name="organizationRefId"
        label={t("organisation")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <OrganisationAutoComplete />
      </Item>
    </AddRowForm>
  );
}

AddContact.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddContact;
