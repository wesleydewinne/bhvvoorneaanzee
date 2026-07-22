import PloegleiderTrainingDetail from "./PloegleiderTrainingDetail";
import { ploegleiderTrainingData } from "./ploegleiderTrainingData";

export default function PloegleiderHerhaling() {
  return (
    <PloegleiderTrainingDetail training={ploegleiderTrainingData.refresher} />
  );
}
