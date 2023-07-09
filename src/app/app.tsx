import { Provider } from "react-redux";
import { store } from "./store";
import { TrainsListTable } from "../features/trains-table/ui/trains-list-table/trains-list-table";
import { TrainsCharacteristicsForm } from "../features/trains-table/ui/trains-characteristics-form/trains-characteristics-form";

import styles from "./app.module.css";

export const App = () => {
  return (
    <Provider store={store}>
      <div className={styles.trainsWrapper}>
        <TrainsListTable />
        <TrainsCharacteristicsForm />
      </div>
    </Provider>
  );
};

export default App;
