import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import { warn } from "../utils/notify-user";

function useRefreshQuery() {
  const [cache, refreshCache] = useState("");
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (cache) {
      console.log("refresh hook lunched");
      queryClient.invalidateQueries([cache]).catch(() => {
        warn(
          t(
            "Le rechargement automatique a échoué, actualisez la page pour voir les mises à jour des données"
          )
        );
      });
    }
  });

  return [cache, refreshCache];
}

export default useRefreshQuery;
