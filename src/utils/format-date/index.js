import Moment from "moment";

const format = "DD-MM-YYYY";

const formatDate = (date) => {
  if (!date) return "";
  const m = new Moment(date, "DD-MM-YYYY");
  return m.format(format);
};

export default formatDate;
