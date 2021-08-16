import { AppBar, Avatar, Box, CircularProgress, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ExitToApp, PhoneForwarded } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearState, fetchUser, navBarSelector } from './navBarSlice'

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    flex: 1
  }
}))

const NavBar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { errorMessage, isFetching, isError, image, name } = useSelector(navBarSelector)
  const classes = useStyles()

  const handleLogout = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      dispatch(clearState())
      console.trace(isError)
      history.push('/login')
    }
  }, [dispatch, errorMessage, history, isError])

  return (
    <>
      <Box mb={1}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>
              SAT:4C
            </Typography>
            <Box className={classes.title} ml={1}>
              <IconButton href='/'>
                <PhoneForwarded />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                onClick={handleLogout}
              >
                <ExitToApp />
              </IconButton>
              {
                isFetching
                  ? (<CircularProgress size='xs' />)
                  : (
                    <IconButton>
                      <Avatar alt={name} src={image} />
                    </IconButton>
                    )
              }
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default NavBar
