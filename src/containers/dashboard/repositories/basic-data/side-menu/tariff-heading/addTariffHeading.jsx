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
  tariffHeadingsListId,
  createTariffHeading
} from "../../../../../../services/repositories/basic-data/tariff-headings";
import ChaptersAutoComplete from "../chapters/chaptersAutoComplete";
import MeasureUnitsAutoComplete from "../../../basic-repositories/side-menu/measure-units/measureUnitsAutoComplete";

const { Item } = Form;

function AddTariffHeading(props) {
  const { discard } = props;
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const dates = {
    productYear: "",
    productExpiryDate: ""
  };

  const { isLoading, mutate } = useMutation(createTariffHeading, {
    onSuccess: () => {
      success(t("Position tarifaire ajoutée"));
      queryClient
        .invalidateQueries(tariffHeadingsListId)
        .catch(() => refetchFailure(t));
      discard();
    },
    onError: () => operationFailed(t)
  });

  return (
    <AddRowForm
      discard={discard}
      addLabel={t("Ajouter une position tarifaire")}
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
        name="hsCode"
        label={t("HS code")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input type="text" />
      </Item>
      <Item
        name="chapterRefId"
        label={t("Référence chapitre")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <ChaptersAutoComplete />
      </Item>
      <Item
        name="parentId"
        label={t("Référence de la position mère")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <Input />
      </Item>
      <Item
        name="unitRefId"
        label={t("Référence unité")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <MeasureUnitsAutoComplete />
      </Item>
      <Item
        name="_productYear"
        label={t("Année du production")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <DatePicker
          picker="year"
          onChange={(date) => {
            dates.productYear = date.format("YYYY");
          }}
        />
      </Item>
      <Item
        name="_productExpiryDate"
        label={t("Date d’expiration")}
        required
        rules={[{ required: true, message: t("Champ requis") }]}
        hasFeedback
      >
        <DatePicker
          onChange={(date) => {
            dates.productExpiryDate = formatDate(date);
          }}
        />
      </Item>
    </AddRowForm>
  );
}

AddTariffHeading.propTypes = {
  discard: PropTypes.func.isRequired
};

export default AddTariffHeading;
