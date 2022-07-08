import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import {
  Button, Form, Input, Typography, notification, message
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

const { Title } = Typography;
const { Item } = Form;
const { Password } = Input;
function RestPassword() {
  const { token } = useParams();
  const history = useHistory();

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [passwordModified, setPasswordModified] = useState(false);

  const request = (values) => {
    setLoading(true);
    const { password } = values;
    console.log("API call =>", password, token);
    setPasswordModified(true);
    setError(true);
    setLoading(false);
  };

  useEffect(() => {
    if (passwordModified) {
      history.push("/login");
      notification.success({
        message: t("Mot de passe modifié"),
        description: t(
          "Veuillez connecter a votre espace en utilisant votre email et vore nouvaux mot de passe"
        )
      });
    }
  }, [passwordModified]);

  useEffect(() => {
    if (error) {
      message
        .error(t("Une erreur s’est produite, veuillez réessayer"))
        .then(() => {})
        .catch(() => {});
    }
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <Title level={2} className={styles.title}>
          <Trans>Réinitialiser votre mot de passe</Trans>
        </Title>
        <Form
          name="reset-Password-Form"
          onFinish={request}
          validateTrigger="onSubmit"
        >
          <Item
            name="password"
            rules={[
              {
                required: true,
                message: t("champs requis")
              },
              {
                min: 6,
                message: t(
                  "le mot de passe doit contenir au moins 6 caractères"
                )
              }
            ]}
          >
            <Password placeholder={t("Tapez votre nouveau mot de passe")} />
          </Item>
          <Item
            name="rePassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: t("champs requis")
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                }
              })
            ]}
          >
            <Password placeholder={t("Retaper le mot de passe")} />
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
                <Trans>Soumettre</Trans>
              </Button>
            </div>
          </Item>
        </Form>
      </div>
    </div>
  );
}

export default RestPassword;
