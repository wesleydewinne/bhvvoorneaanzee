import PloegleiderTrainingDetail from "./PloegleiderTrainingDetail";
import { ploegleiderTrainingData } from "./ploegleiderTrainingData";

export default function PloegleiderBasis2Daagse() {
  return (
    <PloegleiderTrainingDetail
      training={ploegleiderTrainingData.basisTwoDays}
    />
  );
}
