import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Box, Button, CircularProgress, Container, Table, TableBody, TableCell, TableHead, TableRow, TextField, useMediaQuery } from '@material-ui/core'
import { clearState, fetchSearchForPattern, searchSelector } from './searchSlice'
import toast from 'react-hot-toast'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  label: {
    color: 'lightgray',
    '&.Mui-focused': {
      color: 'lightgray'
    }
  },
  link: {
    color: 'lightgray'
  },
  searchBar: {
    display: 'flex',
    justifyContent: 'row'
  }
}))

const Dashboard = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const { errorMessage, isError, isFetching, lines } = useSelector(searchSelector)

  const classes = useStyles()

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage)
      dispatch(clearState())
    }
  }, [dispatch, errorMessage, navigate, isError])

  const handleSearch = (pattern) => {
    dispatch(fetchSearchForPattern(pattern))
  }

  const getType = (usage) => {
    switch (usage) {
      case 'Device':
        return 'line'
      case 'Hunt Pilot':
        return 'huntpilot'
      case 'Translation':
        return 'translation'
      default:
        return usage
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSearch)}>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Box mr={1}>
            <TextField
              InputLabelProps={{ className: prefersDarkMode ? classes.label : null }}
              variant='outlined'
              autoFocus
              margin='dense'
              type='text'
              label='Search'
              inputProps={{ required: true, pattern: '[0-9]+', title: 'Input should only contain numeric values.' }}
              placeholder='Search'
              {...register('pattern')}
            />
          </Box>
          <Button
            type='submit'
            variant='contained'
            color='primary'
          >
            Search
          </Button>
        </Box>
      </form>
      {
        isFetching
          ? (
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              minHeight='20vh'
            >
              <CircularProgress />
            </Box>
            )
          : lines.length
            ? (
              <Container>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Usage</TableCell>
                      <TableCell>Line</TableCell>
                      <TableCell>Route Partition Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Alerting Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lines.map((line) => {
                      const uuid = line._attributes.uuid
                      const pattern = line.pattern
                      const routePartitionName = typeof line?.routePartitionName === 'string' ? line.routePartitionName : null
                      const description = typeof line?.description === 'string' ? line.description : null
                      const alertingName = typeof line?.alertingName === 'string' ? line.alertingName : null
                      const usage = typeof line?.usage === 'string' ? line?.usage : null

                      return (
                        <TableRow key={uuid}>
                          <TableCell>{usage}</TableCell>
                          <TableCell>{usage === 'Device' ? (<Link className={prefersDarkMode ? classes.link : null} to={`/${getType(usage)}/${pattern}`}>{pattern}</Link>) : pattern}</TableCell>
                          <TableCell>{routePartitionName}</TableCell>
                          <TableCell>{description}</TableCell>
                          <TableCell>{alertingName}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Container>
              )
            : null
      }
    </>
  )
}

export default Dashboard
