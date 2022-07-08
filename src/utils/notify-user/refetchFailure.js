import warn from "./warn";

const refetchFailure = (t) => {
  warn(
    t(
      "Le rechargement automatique a échoué, actualisez la page pour voir les mises à jour des données"
    )
  );
};
export default refetchFailure;
