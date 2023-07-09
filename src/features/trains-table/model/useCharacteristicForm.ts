import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import {
  changeCharacteristicEngineAmperage,
  changeCharacteristicForce,
  changeCharacteristicSpeed,
  characteristcSelector,
} from "./trainsSlice";

export const useCharacteristicForm = (id: string) => {
  const { speed, force, engineAmperage } = useAppSelector((state) =>
    characteristcSelector(state, id)
  );

  const dispatch = useDispatch();

  const changeSpeed = (value: string) => {
    dispatch(changeCharacteristicSpeed({ id, value }));
  };

  const changeForce = (value: string) => {
    dispatch(changeCharacteristicForce({ id, value }));
  };

  const changeEngineAmperage = (value: string) => {
    dispatch(changeCharacteristicEngineAmperage({ id, value }));
  };

  return {
    speed,
    force,
    engineAmperage,
    changeSpeed,
    changeForce,
    changeEngineAmperage,
  };
};
