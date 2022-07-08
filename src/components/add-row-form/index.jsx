import React from "react";
import PropTypes from "prop-types";
import { Form, Typography } from "antd";
import AddFormActions from "../form-submitter";
import styles from "./styles.module.scss";

const { Title } = Typography;

function AddRowForm(props) {
  const {
    children, addLabel, onSubmit, discard, loading
  } = props;
  return (
    <div className={styles.addWrapper}>
      <Title level={5}>{addLabel}</Title>
      <Form
        name="custom-add-item-form"
        onFinish={onSubmit}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
        {children}
        <AddFormActions discard={discard} loading={loading} />
      </Form>
    </div>
  );
}

AddRowForm.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
  addLabel: PropTypes.string.isRequired,
  discard: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

export default AddRowForm;
