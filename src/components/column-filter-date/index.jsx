import React from "react";
import PropTypes from "prop-types";
import { Button, DatePicker } from "antd";
import styles from "./styles.module.scss";

const { RangePicker } = DatePicker;

function ColumnFilterDates(props) {
  const { search } = props;

  const onChangeHandler = (pickedDates) => {
    const [start, end] = pickedDates;
    search(start.unix(), end.unix());
  };

  const reset = () => {
    search(null);
  };

  return (
    <div className={styles.container}>
      <div>
        <RangePicker onChange={onChangeHandler} />
      </div>
      <div className={styles.alignRight}>
        <Button
          type="primary"
          className={styles.button}
          size="small"
          onClick={reset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

ColumnFilterDates.propTypes = {
  search: PropTypes.func.isRequired
};

export default ColumnFilterDates;
