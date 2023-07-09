import { Train } from "../../model";
import { useTrainsList } from "../../model/useTrainsList";

import styles from "./trains-list-table.module.css";

export const TrainsListTable = () => {
  const { loading, trainsList, changeSelectedTrain } = useTrainsList();

  const handleRowClick = (train: Train) => {
    changeSelectedTrain(train);
  };

  if (!trainsList) {
    return null;
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <table className={styles.trainsListTable}>
          <tbody>
            <tr className={styles.trainsListTableHeader}>
              <th className={styles.tableListTableCell}>Название</th>
              <th className={styles.tableListTableCell}>Описание</th>
            </tr>
            {trainsList.map((train) => (
              <tr
                key={train.name}
                onClick={() => handleRowClick(train)}
                tabIndex={0}
                className={styles.trainsListTableRow}
              >
                <td className={styles.tableListTableCell}>{train.name}</td>
                <td className={styles.tableListTableCell}>{train.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
