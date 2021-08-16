import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login } from './loginAPI'

export const loginUser = createAsyncThunk('logins/login', login)

export const loginSlice = createSlice({
  name: 'login',
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
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.email
      state.username = payload.username
      state.isFetching = false
      state.isSuccess = true
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.isError = true
      state.errorMessage = payload.message
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true
    }
  }
})

export const { clearState } = loginSlice.actions

export const loginSelector = (state) => state.login
