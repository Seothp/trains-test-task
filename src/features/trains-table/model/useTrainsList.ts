import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";
import {
  changeSelectedTrain as changeSelectedTrainAction,
  fetchTrainsList,
  trainsListSelector,
  trainsStatusSelector,
} from "./trainsSlice";
import { Train } from "./types";

export const useTrainsList = () => {
  const dispatch = useAppDispatch();
  
  const status = useAppSelector(trainsStatusSelector);
  const trainsList = useAppSelector(trainsListSelector);

  const changeSelectedTrain = (train: Train) => {
    dispatch(changeSelectedTrainAction(train));
  };

  useEffect(() => {
    dispatch(fetchTrainsList());
  }, [dispatch]);

  return { trainsList, loading: status === "loading", changeSelectedTrain };
};
