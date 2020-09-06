import { ClassSpecType, Debuff } from "../../types/api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, Thunk, Dispatch } from "../store"
import { fetchSpecs, fetchDebuffs } from "../../actions/api"
import { populateGrid, findInGrid } from "../../utils/appUtils"
import { partySize } from "../../constants/wow"
import { GridValue } from "../../types/app"

interface AppState {
  specs: ClassSpecType[]
  gridValues: string[][]
  debuffs: Debuff[]
  activeDebuffs: string[]
}

const initialState: AppState = {
  specs: [],
  gridValues: populateGrid(40 / partySize),
  debuffs: [],
  activeDebuffs: [],
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
      const prevValue = gridValues[x][y]
      gridValues[x][y] = value
      state.gridValues = gridValues
    },
    _getDebuffs: (state, action: PayloadAction<Debuff[]>) => {
      state.debuffs = action.payload
    },
  },
})

// Reducers
export default appSlice.reducer

// Selectors
export const appSelector = (state: RootState) => state.app

// Actions
const { _getSpecs, _setGridValue, _getDebuffs } = appSlice.actions

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

export const getDebuffs = (): Thunk => (dispatch: Dispatch) => {
  fetchDebuffs().then(result => {
    dispatch(_getDebuffs(result))
  })
}
