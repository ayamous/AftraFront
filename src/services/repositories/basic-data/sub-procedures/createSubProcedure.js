import { post } from "../../../http.service";
import { unSlash } from "../../../../utils";

const gateway = unSlash(process.env.REACT_APP_GATEWAY);

// nationalProcedureRef
const createSubProcedure = async ({ code, procedureId }) => {
  const payload = {
    code,
    nationalProcedureRef: `${gateway}/countryRefs/${procedureId}`
  };

  return post("/extendedProcedureRefs", payload);
};

export default createSubProcedure;
