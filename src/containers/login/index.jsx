import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Form, Input, Button, Checkbox, Row, Col, Typography
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { login } from "../../stores/authentication/actions";
import { login as loginService } from "../../services/auth";
import { failure } from "../../utils/notify-user";

const { Item } = Form;
const { Title } = Typography;

function Login() {
  const isAuthenticated = useSelector(
    (state) => state.AuthReducer.isAuthenticated
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const connect = async (values) => {
    setLoading(true);
    const { username, password, rememberMe } = values;
    let res = null;
    try {
      res = await loginService({ username, password });
    } catch (e) {
      failure(t("Authentification echouée"));
      return setLoading(false);
    }

    if (!res || !res.ok) {
      failure(t("Username et/ou mot de passe incorrect(s)"));
      return setLoading(false);
    }
    const credentials = await res.json();

    dispatch(login(credentials.access_token, rememberMe));
    return setLoading(false);
  };
  // if (called && loading) return <Spinner />;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <Title level={2} className={styles.title}>
          <Trans>Connectez-vous!</Trans>
        </Title>
        <Form
          name="normal_login"
          initialValues={{ rememberMe: true }}
          onFinish={connect}
          validateTrigger="onSubmit"
        >
          <Item
            name="username"
            rules={[
              {
                required: true,
                message: t("Entrez votre username")
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="username"
            />
          </Item>
          <Item
            name="password"
            rules={[
              {
                required: true,
                message: t("Entrez votre mot de passe")
              },
              {
                min: 4,
                message: t("Mot de passe incorrect")
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder={t("mot de passe")}
            />
          </Item>
          <Item>
            <Row>
              <Col span={12}>
                <Item name="rememberMe" valuePropName="checked" noStyle>
                  <Checkbox>
                    <Trans>Maintenir la connexion</Trans>
                  </Checkbox>
                </Item>
              </Col>
              <Col span={12} className={styles.right}>
                <Link to="/forgot-password" className="login-form-forgot">
                  <Trans>Mot de passe oublié</Trans>
                  ?
                </Link>
              </Col>
            </Row>
          </Item>
          <Item>
            <div className={styles.loginButton}>
              <Button type="primary" htmlType="submit" disabled={loading}>
                <Trans>Connexion</Trans>
              </Button>
            </div>
          </Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
