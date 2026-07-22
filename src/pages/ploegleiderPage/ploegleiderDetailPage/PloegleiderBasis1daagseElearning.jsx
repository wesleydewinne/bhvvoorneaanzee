import PloegleiderTrainingDetail from "./PloegleiderTrainingDetail";
import { ploegleiderTrainingData } from "./ploegleiderTrainingData";

export default function PloegleiderBasis1daagseElearning() {
  return (
    <PloegleiderTrainingDetail
      training={ploegleiderTrainingData.basisElearning}
    />
  );
}
