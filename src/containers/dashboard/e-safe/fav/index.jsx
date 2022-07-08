import React from "react";
import PropTypes from "prop-types";
import { StarFilled, StarOutlined } from "@ant-design/icons";

function Fav(props) {
  const { id, faved } = props;

  const favHandler = (action) => {
    console.log(id, " ===faved ==>", action);
  };

  if (faved) return <StarFilled onClick={() => favHandler(true)} />;
  return <StarOutlined onClick={() => favHandler(false)} />;
}

Fav.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  faved: PropTypes.bool.isRequired
};

export default Fav;
