import failure from "./failure";

const operationFailed = (t) => {
  failure(t("Opération échouée! Veuillez réessayer"));
};
export default operationFailed;
