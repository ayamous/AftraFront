import Moment from "moment";

const format = "DD-MM-YYYY";

const formatDate = (date) => {
  const m = new Moment(date);
  return m.format(format);
};

export default formatDate;
