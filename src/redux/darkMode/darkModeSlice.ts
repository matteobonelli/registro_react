import { createSlice } from '@reduxjs/toolkit'

export interface DarkModeState {
  dark: boolean
}

const initialState: DarkModeState = {
  dark: false,
}

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    switchMode : (state) => {
        state.dark = !state.dark
    }
  },
})

export const { switchMode } = darkModeSlice.actions

export default darkModeSlice.reducer