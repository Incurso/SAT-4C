import { configureStore } from '@reduxjs/toolkit'
import { lineSlice } from '../features/Line/lineSlice'
import { loginSlice } from '../features/Login/loginSlice'
import { navBarSlice } from '../features/NavBar/navBarSlice'
import { searchSlice } from '../features/Search/searchSlice'

export const store = configureStore({
  reducer: {
    line: lineSlice.reducer,
    login: loginSlice.reducer,
    navBar: navBarSlice.reducer,
    search: searchSlice.reducer
  }
})
