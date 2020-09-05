import { ClassSpecType } from "../../types/api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, Thunk, Dispatch } from "../store"
import { fetchSpecs } from "../../actions/api"
import { populateGrid } from "../../utils/appUtils"
import { partySize } from "../../constants/wow"
import { GridValue } from "../../types/app"

interface AppState {
  specs: ClassSpecType[]
  gridValues: string[][]
}

const initialState: AppState = {
  specs: [],
  gridValues: populateGrid(40 / partySize),
}

// Slice
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    _getSpecs: (state, action: PayloadAction<ClassSpecType[]>) => {
      state.specs = action.payload
    },
    _setGridValue: (state, action: PayloadAction<GridValue>) => {
      const { x, y, value } = action.payload
      const gridValues = state.gridValues
      gridValues[x][y] = value
      state.gridValues = gridValues
    },
  },
})

// Reducers
export default appSlice.reducer

// Selectors
export const appSelector = (state: RootState) => state.app

// Actions
const { _getSpecs, _setGridValue } = appSlice.actions

// Thunks
export const getSpecs = (): Thunk => (dispatch: Dispatch) => {
  fetchSpecs().then(result => {
    dispatch(_getSpecs(result))
  })
}

export const setGridValue = (gridValue: GridValue): Thunk => (
  dispatch: Dispatch,
) => {
  dispatch(_setGridValue(gridValue))
}
