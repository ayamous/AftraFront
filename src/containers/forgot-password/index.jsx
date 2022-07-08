import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Form, Input, Button, Typography, notification
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

const { Item } = Form;
const { Title } = Typography;
function ForgottenPassword() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const request = (values) => {
    setLoading(true);
    const { email } = values;
    console.log("email ====>", email);
    setLoading(false);
    notification.success({
      message: t("Demande envoyée"),
      description: t(
        "Vous recevrez un email où vous trouverez un lien pour réinitialiser votre mot de passe. Le lien sera disponible pendant 2 heures"
      )
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <Title level={2} className={styles.title}>
          <Trans>Mot de passe oublié?</Trans>
        </Title>
        <Form
          name="Forgotten-Password-Form"
          className="login-form"
          onFinish={request}
          validateTrigger="onSubmit"
        >
          <Item
            name="email"
            rules={[
              {
                required: true,
                message: t("Entrez votre email")
              },
              {
                required: true,
                type: "email",
                message: t("Adresse email invalide")
              }
            ]}
            hasFeedback
          >
            <Input name="email" placeholder="email" />
          </Item>
          <Item>
            <Link to="/Login">
              <LeftOutlined />
              <Trans>Retourner au page de connexion</Trans>
            </Link>
          </Item>
          <Item>
            <div className={styles.submitButton}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                disabled={loading}
              >
                <Trans>Demande de réinitialisation</Trans>
              </Button>
            </div>
          </Item>
        </Form>
      </div>
    </div>
  );
}

export default ForgottenPassword;
