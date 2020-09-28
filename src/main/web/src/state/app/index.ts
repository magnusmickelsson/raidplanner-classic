import { ClassSpec, Debuff, DebuffItem } from "../../types/api"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, Thunk, Dispatch } from "../store"
import {
  fetchSpecs,
  fetchDebuffs,
  fetchSpecsByFaction,
  fetchSpecsByClassForFaction,
  fetchItems,
  postRaid,
} from "../../actions/api"
import { populateGrid } from "../../utils/appUtils"
import { partySize, factions, numDebuffSlots } from "../../constants/wow"
import { DebuffSlotAction, GridAction } from "../../types/app"

interface AppState {
  specs: ClassSpec[]
  specsByClass: Record<string, ClassSpec[]>
  gridValues: ClassSpec[][] | undefined[][]
  debuffs: Debuff[]
  activeDebuffs: string[]
  selectedFaction: string
  debuffSlots: Debuff[] | undefined[]
  items: DebuffItem[]
  activeItems: DebuffItem[]
  savedRaidId: string | undefined
}

const initialState: AppState = {
  specs: [],
  specsByClass: {},
  gridValues: populateGrid(40 / partySize),
  debuffs: [],
  activeDebuffs: [],
  selectedFaction: factions.ALLIANCE.toLowerCase(),
  debuffSlots: new Array(numDebuffSlots).fill(undefined),
  items: [],
  activeItems: [],
  savedRaidId: undefined,
}

// Slice
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    _getSpecs: (state, action: PayloadAction<ClassSpec[]>) => {
      state.specs = action.payload
    },
    _getSpecsByClassForFaction: (
      state,
      action: PayloadAction<Record<string, ClassSpec[]>>,
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
    _setDebuffSlot: (state, action: PayloadAction<DebuffSlotAction>) => {
      const { i, value, prev_i } = action.payload
      const { debuffSlots } = state

      if (prev_i !== undefined) {
        if (debuffSlots[i]) debuffSlots[prev_i] = debuffSlots[i]
        else debuffSlots[prev_i] = undefined
      }

      debuffSlots[i] = value
      state.debuffSlots = debuffSlots
    },
    _getItems: (state, action: PayloadAction<DebuffItem[]>) => {
      state.items = action.payload
    },
    _toggleItem: (state, action: PayloadAction<DebuffItem>) => {
      const existingIndex = state.activeItems.findIndex(
        item => item.name === action.payload.name,
      )

      if (existingIndex !== -1) {
        state.activeItems.splice(existingIndex, 1)
      } else {
        state.activeItems.push(action.payload)
      }
    },
    _setSavedRaidId: (state, action: PayloadAction<string>) => {
      state.savedRaidId = action.payload
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
  _setDebuffSlot,
  _getItems,
  _toggleItem,
  _setSavedRaidId,
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

export const setDebuffSlot = (debuffSlotAction: DebuffSlotAction): Thunk => (
  dispatch: Dispatch,
) => {
  dispatch(_setDebuffSlot(debuffSlotAction))
}

export const getItems = (): Thunk => (dispatch: Dispatch) => {
  fetchItems().then(result => dispatch(_getItems(result)))
}

export const toggleItem = (item: DebuffItem): Thunk => (dispatch: Dispatch) => {
  dispatch(_toggleItem(item))
}

export const saveRaid = (gridValues: ClassSpec[][] | undefined[][]): Thunk => (
  dispatch: Dispatch,
) => {
  postRaid(gridValues).then(result => dispatch(_setSavedRaidId(result.data))) // TODO: Set URL to returned ID?
}
