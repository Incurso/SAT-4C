import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline, Paper, useMediaQuery } from '@material-ui/core'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Login from './features/Login'
import Search from './features/Search'
import { PrivateRoute } from './helpers/PrivateRoute'
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
          <Switch>
            <Route exact component={Login} path='/login' />
            <PrivateRoute exact component={Search} path='/' />
            <PrivateRoute exact component={Line} path='/line/:number' />
            <Route path='*' component={NotFound} />
          </Switch>
        </Router>
      </Paper>
    </ThemeProvider>
  )
}

export default App
