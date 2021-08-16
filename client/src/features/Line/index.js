import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { clearState, fetchLine, lineSelector, updateLine } from './lineSlice'
import { Button, Container, makeStyles, TextField, Typography, useMediaQuery } from '@material-ui/core'

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
  }
}))

const Device = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const classes = useStyles()
  const { number } = useParams()
  const { alertingName, callForwardAll, description, pattern } = useSelector(lineSelector)
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      callForwardAll: {
        destination: ''
      }
    }
  })
  const dispatch = useDispatch()
  const { isFetching, isError, isSaved, errorMessage } = useSelector(lineSelector)

  useEffect(() => {
    dispatch(fetchLine({ number }))
  }, [dispatch, number])

  useEffect(() => {
    setValue('callForwardAll.destination', callForwardAll.destination)
  }, [callForwardAll, setValue])

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage)
      dispatch(clearState())
    }
    if (isSaved) {
      toast.success('Saved')
      dispatch(clearState())
    }
  }, [dispatch, errorMessage, isError, isSaved])

  const onSubmit = (data) => {
    dispatch(updateLine({ pattern, ...data }))
  }

  return (
    <>
      <Container maxWidth='md'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography>Directory Number: {pattern}</Typography>
          <Typography>Description: {description}</Typography>
          <Typography>Alerting Name: {alertingName} </Typography>
          <Controller
            control={control}
            name='callForwardAll.destination'
            render={
              ({ field }) => {
                return (
                  <TextField
                    InputLabelProps={{ className: prefersDarkMode ? classes.label : null }}
                    margin='dense'
                    variant='outlined'
                    label='Destination'
                    fullWidth
                    inputProps={{ pattern: '\\+{0,1}[0-9]+', title: 'Input can start with +, after that it should only contain numeric values. e.g.: +3545660066, 05660066, 1000' }}
                    {...field}
                  />
                )
              }
            }
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={isFetching}
          >
            Save
          </Button>
        </form>
      </Container>
    </>
  )
}

export default Device
