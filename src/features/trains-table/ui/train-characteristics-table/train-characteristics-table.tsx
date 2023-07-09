import { Characteristic } from "../../model";
import { TrainCharacteristicsRow } from "./train-characteristics-row";

import styles from "./train-characteristics-table.module.css";

type Props = {
  characteristics: Characteristic[];
};
export const TrainCharacteristicsTable = ({ characteristics }: Props) => {
  return (
    <table className={styles.trainCharacteristicsTable}>
      <tbody>
        <tr>
          <th className={styles.trainCharacteristicsTableHeader}>
            Ток двигателя
          </th>
          <th className={styles.trainCharacteristicsTableHeader}>Сила тяги</th>
          <th className={styles.trainCharacteristicsTableHeader}>Скорость</th>
        </tr>
        {characteristics.map((_, i) => (
          // index as key because there is no id
          <TrainCharacteristicsRow index={i} key={i} />
        ))}
      </tbody>
    </table>
  );
};
