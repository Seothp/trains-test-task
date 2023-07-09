import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Characteristic, Train } from "./types";

const GET_TRAINS_URL =
  "https://gist.githubusercontent.com/orlov-oleg-developer/49f08290d1c59a6851e0a0581900e2a7/raw/e5daf87338f3c75165f8edf4c76cc7ec9c2b4aa9/gistfile1.json";

type State = {
  status: "loading" | "success" | "error" | "idle";
  trainsList: Train[];
  selectedTrainInitial: Train | null;
  selectedTrain: Train | null;
  selectedTrainCharacterisitcs: Record<
    string,
    Record<keyof Characteristic, string>
  > | null;
  selectedTrainCharacterisitcsErrors: Record<
    string,
    Record<keyof Characteristic, boolean>
  > | null;
};

const initialState: State = {
  status: "idle",
  trainsList: [],
  selectedTrainInitial: null,
  selectedTrain: null,
  selectedTrainCharacterisitcs: null,
  selectedTrainCharacterisitcsErrors: null,
};

const VALID_INTEGER_REGEXP = new RegExp(/(^[1-9][0-9]*$)|^0$/);
const VALID_FLOAT_REGEXP = new RegExp(/((^[1-9][0-9]*)|^0)(\.[0-9]+)?$/);

const isValidInteger = (value: string) =>
  Boolean(value.match(VALID_INTEGER_REGEXP));
const isValidFloat = (value: string) =>
  Boolean(value.match(VALID_FLOAT_REGEXP));

export const trainsTableSlice = createSlice({
  name: "trainsTable",
  initialState,
  reducers: {
    setTrainsList: (state, action) => {
      state.trainsList = action.payload;
    },
    changeSelectedTrain: (state, action: { payload: Train }) => {
      const characteristicsEntries = action.payload.characteristics.map(
        (characteristic, i) => [
          i,
          {
            speed: String(characteristic.speed),
            force: String(characteristic.force),
            engineAmperage: String(characteristic.engineAmperage),
          },
        ]
      );

      const mappedCharacteristics = Object.fromEntries(
        characteristicsEntries
      ) as Record<number, Record<keyof Characteristic, string>>;

      const characteristicsErrorsEntries = action.payload.characteristics.map(
        (_, i) => [
          i,
          {
            speed: false,
            force: false,
            engineAmperage: false,
          },
        ]
      );

      const mappedCharacteristicsErrors = Object.fromEntries(
        characteristicsErrorsEntries
      );

      state.selectedTrainCharacterisitcs = mappedCharacteristics;
      state.selectedTrainCharacterisitcsErrors = mappedCharacteristicsErrors;
      state.selectedTrain = action.payload;
    },
    changeCharacteristicSpeed: (
      state,
      action: { payload: { id: string; value: string } }
    ) => {
      const { id, value } = action.payload;

      if (
        !state.selectedTrainCharacterisitcs ||
        !state.selectedTrainCharacterisitcsErrors
      ) {
        return;
      }

      const isNewValueValid = isValidInteger(value);

      state.selectedTrainCharacterisitcsErrors[id].speed = !isNewValueValid;

      state.selectedTrainCharacterisitcs[id].speed = value;
    },
    changeCharacteristicForce: (state, action) => {
      const { id, value } = action.payload;

      if (
        !state.selectedTrainCharacterisitcs ||
        !state.selectedTrainCharacterisitcsErrors
      ) {
        return;
      }

      const isNewValueValid = isValidFloat(value);

      state.selectedTrainCharacterisitcsErrors[id].force = !isNewValueValid;

      state.selectedTrainCharacterisitcs[id].force = value;
    },
    changeCharacteristicEngineAmperage: (state, action) => {
      const { id, value } = action.payload;

      if (
        !state.selectedTrainCharacterisitcs ||
        !state.selectedTrainCharacterisitcsErrors
      ) {
        return;
      }

      const isNewValueValid = isValidInteger(value);

      state.selectedTrainCharacterisitcsErrors[id].engineAmperage =
        !isNewValueValid;

      state.selectedTrainCharacterisitcs[id].engineAmperage = value;
    },
    submitCharacteristicsForm: (state) => {
      if (!state.selectedTrainCharacterisitcs) {
        return;
      }

      console.log(
        Object.values(state.selectedTrainCharacterisitcs)
          .sort((a, b) => Number(a.speed) - Number(b.speed))
          // unwrapping proxy
          .map((characteristc) => ({ ...characteristc }))
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTrainsList.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTrainsList.fulfilled, (state, action) => {
      state.status = "success";
      state.trainsList = action.payload;
    });
    builder.addCase(fetchTrainsList.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const fetchTrainsList = createAsyncThunk(
  "trainsTable/fetchTrainsList",
  async () => {
    const response = await fetch(GET_TRAINS_URL);

    return response.json();
  }
);

/*
  Selectors
*/

export const trainsSelector = (state: { trains: State }) => {
  return state.trains;
};

export const trainsStatusSelector = (state: { trains: State }) =>
  trainsSelector(state).status;

export const trainsListSelector = (state: { trains: State }) =>
  trainsSelector(state).trainsList;

export const selectedTrainSelector = (state: { trains: State }) =>
  trainsSelector(state).selectedTrain;

export const characteristcSelector = (state: { trains: State }, id: string) =>
  trainsSelector(state).selectedTrainCharacterisitcs?.[id] ?? {
    speed: "",
    force: "",
    engineAmperage: "",
  };

export const isAllFieldsValidSelector = (state: { trains: State }) => {
  const { selectedTrainCharacterisitcsErrors } = trainsSelector(state);
  if (!selectedTrainCharacterisitcsErrors) {
    return true;
  }

  return Object.values(selectedTrainCharacterisitcsErrors).every(
    (characteristics) =>
      Object.values(characteristics).every((isFieldInvalid) => !isFieldInvalid)
  );
};

/*
  Actions
*/

const {
  changeSelectedTrain,
  changeCharacteristicEngineAmperage,
  changeCharacteristicForce,
  changeCharacteristicSpeed,
  setTrainsList,
  submitCharacteristicsForm,
} = trainsTableSlice.actions;

export {
  changeSelectedTrain,
  changeCharacteristicEngineAmperage,
  changeCharacteristicForce,
  changeCharacteristicSpeed,
  setTrainsList,
  submitCharacteristicsForm,
};
