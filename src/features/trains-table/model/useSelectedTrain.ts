import { useAppSelector } from "../../../app/hooks";

export const useSelectedTrain = () => {
  const selectedTrain = useAppSelector(
    (state) => state.trains.selectedTrain
  );

  return { selectedTrain };
};
