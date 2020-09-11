import { ClassSpecType, Debuff } from "../../types/api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, Thunk, Dispatch } from "../store"
import {
  fetchSpecs,
  fetchDebuffs,
  fetchSpecsByFaction,
  fetchSpecsByClassForFaction,
} from "../../actions/api"
import { populateGrid } from "../../utils/appUtils"
import { partySize, factions } from "../../constants/wow"
import { GridValue, GridAction } from "../../types/app"

interface AppState {
  specs: ClassSpecType[]
  specsByClass: Record<string, ClassSpecType[]>
  gridValues: ClassSpecType[][] | undefined[][]
  debuffs: Debuff[]
  activeDebuffs: string[]
  selectedFaction: string
}

const initialState: AppState = {
  specs: [],
  specsByClass: {},
  gridValues: populateGrid(40 / partySize),
  debuffs: [],
  activeDebuffs: [],
  selectedFaction: factions.ALLIANCE.toLowerCase(),
}

// Slice
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    _getSpecs: (state, action: PayloadAction<ClassSpecType[]>) => {
      state.specs = action.payload
    },
    _getSpecsByClassForFaction: (
      state,
      action: PayloadAction<Record<string, ClassSpecType[]>>,
    ) => {
      state.specsByClass = action.payload
    },
    _setGridValue: (state, action: PayloadAction<GridAction>) => {
      const { x, y, value } = action.payload.gridValue
      const { prev_x, prev_y } = action.payload
      const gridValues = state.gridValues

      if (prev_x !== undefined && prev_y !== undefined) {
        if (gridValues[x][y]) gridValues[prev_x][prev_y] = gridValues[x][y]
        else gridValues[prev_x][prev_y] = undefined
      }

      gridValues[x][y] = value
      state.gridValues = gridValues
    },
    _getDebuffs: (state, action: PayloadAction<Debuff[]>) => {
      state.debuffs = action.payload
    },
    _selectFaction: (state, action: PayloadAction<string>) => {
      state.selectedFaction = action.payload
    },
  },
})

// Reducers
export default appSlice.reducer

// Selectors
export const appSelector = (state: RootState) => state.app

// Actions
const {
  _getSpecs,
  _setGridValue,
  _getDebuffs,
  _selectFaction,
  _getSpecsByClassForFaction,
} = appSlice.actions

// Thunks
export const getSpecs = (): Thunk => (dispatch: Dispatch) => {
  fetchSpecs().then(result => {
    dispatch(_getSpecs(result))
  })
}

export const getSpecsByFaction = (faction: string): Thunk => (
  dispatch: Dispatch,
) => {
  fetchSpecsByFaction(faction).then(result => {
    dispatch(_getSpecs(result))
  })
}

export const getSpecsByClassForFaction = (faction: string): Thunk => (
  dispatch: Dispatch,
) => {
  fetchSpecsByClassForFaction(faction).then(result => {
    dispatch(_getSpecsByClassForFaction(result))
  })
}

export const setGridValue = (gridValue: GridAction): Thunk => (
  dispatch: Dispatch,
) => {
  dispatch(_setGridValue(gridValue))
}

export const getDebuffs = (): Thunk => (dispatch: Dispatch) => {
  fetchDebuffs().then(result => {
    dispatch(_getDebuffs(result))
  })
}

export const selectFaction = (faction: string): Thunk => (
  dispatch: Dispatch,
) => {
  dispatch(_selectFaction(faction))
}
