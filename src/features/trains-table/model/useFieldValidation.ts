import { useSelector } from "react-redux";
import { isAllFieldsValidSelector } from "./trainsSlice";

export const useFieldValidation = () => {
  const isAllFieldsValid = useSelector(isAllFieldsValidSelector);

  return {
    isAllFieldsValid,
  };
};
