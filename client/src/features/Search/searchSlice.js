import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { searchPattern } from './searchAPI'

export const fetchSearchForPattern = createAsyncThunk('searchs/fetchSearchForPattern', searchPattern)

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    lines: [],
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
    [fetchSearchForPattern.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.isSuccess = true

      state.lines = payload.data
    },
    [fetchSearchForPattern.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.isError = true

      state.errorMessage = payload.message
    },
    [fetchSearchForPattern.pending]: (state) => {
      state.isFetching = true
    }
  }
})

export const { clearState } = searchSlice.actions

export const searchSelector = (state) => state.search
