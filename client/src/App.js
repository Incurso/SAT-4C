import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
//import { CssBaseline, Paper, useMediaQuery } from '@material-ui/core'
//import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline, Paper, useMediaQuery } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Login from './features/Login'
import Search from './features/Search'
import { RequireAuth } from './helpers/RequireAuth'
import NotFound from './features/NotFound'
import Line from './features/Line'

export const light = {
  palette: {
    type: 'light'
  },
  typography: {
    fontFamily: [
      '"Segoe UI"',
      'Tahoma',
      'Geneva',
      'Verdana',
      'sans-serif'
    ]
  }
}

export const dark = {
  palette: {
    type: 'dark'
  },
  typography: {
    fontFamily: [
      '"Segoe UI"',
      'Tahoma',
      'Geneva',
      'Verdana',
      'sans-serif'
    ]
  }
}

function App () {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const appliedTheme = createTheme(prefersDarkMode ? dark : light)

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline />
      <Paper style={{ flex: 1, borderRadius: 0 }}>
        <Router>
          <Routes>
            <Route exact path='/login' element={<Login />} />

            <Route
              exact path='/'
              element={
                <RequireAuth>
                  <Search />
                </RequireAuth>
              }
            />

            <Route
              exact path='/line/:number'
              element={
                <RequireAuth>
                  <Line />
                </RequireAuth>
              }
            />

            <Route path='*' component={NotFound} />
          </Routes>
        </Router>
      </Paper>
    </ThemeProvider>
  )
}

export default App
