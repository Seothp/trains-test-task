import { useCharacteristicForm } from "../../model/useCharacteristicForm";

import styles from "./train-characteristics-row.module.css";

type Props = {
  index: number;
};

export const TrainCharacteristicsRow = ({ index }: Props) => {
  const {
    speed,
    force,
    engineAmperage,
    changeSpeed,
    changeForce,
    changeEngineAmperage,
  } = useCharacteristicForm(String(index));

  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell}>
        <input
          type="text"
          value={engineAmperage}
          onChange={(e) => changeEngineAmperage(e.target.value)}
          className={styles.input}
        />
      </td>
      <td className={styles.tableCell}>
        <input
          type="text"
          value={force}
          onChange={(e) => changeForce(e.target.value)}
          className={styles.input}
        />
      </td>
      <td className={styles.tableCell}>
        <input
          type="text"
          value={speed}
          onChange={(e) => changeSpeed(e.target.value)}
          className={styles.input}
        />
      </td>
    </tr>
  );
};
