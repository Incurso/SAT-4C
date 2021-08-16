import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { get, put } from './lineAPI'

export const fetchLine = createAsyncThunk('lines/fetch', get)
export const updateLine = createAsyncThunk('lines/update', put)

export const lineSlice = createSlice({
  name: 'line',
  initialState: {
    alertingName: '',
    pattern: '',
    description: '',
    usage: '',
    routePartitionName: '',
    callForwardAll: {
      forwardToVoiceMail: false,
      callingSearchSpace: '',
      destination: ''
    },
    isFetching: false,
    isSuccess: false,
    isSaved: false,
    isError: false,
    errorMessage: ''
  },
  reducers: {
    clearState: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isSaved = false
      state.isFetching = false

      return state
    }
  },
  extraReducers: {
    [fetchLine.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.isSuccess = true

      state.alertingName = typeof payload.alertingName === 'string' ? payload.alertingName : ''
      state.pattern = payload.pattern
      state.description = typeof payload.description === 'string' ? payload.description : ''
      state.usage = payload.usage
      state.routePartitionName = payload.routePartitionName
      state.callForwardAll.forwardToVoiceMail = payload.callForwardAll.forwardToVoiceMail
      state.callForwardAll.callingSearchSpace = payload.callForwardAll.callingSearchSpace
      state.callForwardAll.destination = typeof payload.callForwardAll.destination === 'string' ? payload.callForwardAll.destination : ''
    },
    [fetchLine.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.isError = true

      state.errorMessage = payload.message
    },
    [fetchLine.pending]: (state) => {
      state.isFetching = true
    },

    [updateLine.fulfilled]: (state) => {
      state.isSaved = true
    },
    [updateLine.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.isError = true

      state.errorMessage = payload.message
    },
    [updateLine.pending]: (state) => {
      state.isFetching = true
    }
  }
})

export const { clearState } = lineSlice.actions

export const lineSelector = (state) => state.line
