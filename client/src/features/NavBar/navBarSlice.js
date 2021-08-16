import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUser } from './navBarAPI'

export const fetchUser = createAsyncThunk('navBars/fetchUser', getUser)

export const navBarSlice = createSlice({
  name: 'navBar',
  initialState: {
    name: '',
    image: '',
    username: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
  },
  reducers: {
    clearState: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isFetching = false

      return state
    }
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.isSuccess = true
      state.email = payload.email
      state.username = payload.username
      state.name = payload.name
      state.image = payload.image
    },
    [fetchUser.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.isError = true
      state.errorMessage = payload.message
    },
    [fetchUser.pending]: (state) => {
      state.isFetching = true
    }
  }
})

export const { clearState } = navBarSlice.actions

export const navBarSelector = (state) => state.navBar
