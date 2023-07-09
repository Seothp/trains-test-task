import { useCharacteristicsFormSubmit } from "../../model/useCharacteristicsFormSubmit";
import { useFieldValidation } from "../../model/useFieldValidation";
import { useSelectedTrain } from "../../model/useSelectedTrain";
import { TrainCharacteristicsTable } from "../train-characteristics-table/train-characteristics-table";

import styles from "./trains-characteristics-form.module.css";

export const TrainsCharacteristicsForm = () => {
  const { selectedTrain } = useSelectedTrain();
  const { submit } = useCharacteristicsFormSubmit();
  const { isAllFieldsValid } = useFieldValidation();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {selectedTrain && (
          <>
            <TrainCharacteristicsTable
              characteristics={selectedTrain.characteristics}
            />
            <button
              type="submit"
              disabled={!isAllFieldsValid}
              className={styles.button}
            >
              Отправить
            </button>
          </>
        )}
      </form>
    </div>
  );
};
