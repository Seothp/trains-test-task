import { useDispatch } from "react-redux";
import { submitCharacteristicsForm } from "./trainsSlice";

export const useCharacteristicsFormSubmit = () => {
  const dispatch = useDispatch();
  const submit = () => {
    dispatch(submitCharacteristicsForm());
  };

  return { submit };
};
