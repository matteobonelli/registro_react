import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'


export const getSettings = createAsyncThunk('getSettings',
    async () => {
      //const response = await axios.get<EnableMenu>('http://localhost:3000/settings')
      const response = fetch('http://localhost:3000/settings')
      return await (await response).json() as SettingsState
    },
  )

interface EnableMenu {
    enableSubjects: boolean,
    enableClassrooms: boolean,
    enableUsers: boolean,
  }

  interface SettingsState {
    enableMenu: EnableMenu | null;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    lng: string,
    dark: boolean
  }

  const initialState: SettingsState = {
    enableMenu: null,
    loading: 'idle',
    lng: 'it',
    dark: false
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    changeDarkMode: (state) => {
      state.dark = (!state.dark)
    }
  },
  extraReducers(builder) {
    builder.addCase(getSettings.pending, (state) => {
      state.loading = 'pending'
    })

    builder.addCase(getSettings.fulfilled, (state, action: PayloadAction<SettingsState>) => {
      console.log(action.payload);
        state.loading = 'succeeded'
        state.enableMenu = action.payload.enableMenu
        state.lng = action.payload.lng
        state.dark = action.payload.dark
      })
  },
})

// Action creators are generated for each case reducer function
export const { changeDarkMode } = settingsSlice.actions

export default settingsSlice.reducer


