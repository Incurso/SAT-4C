const HOSTNAME = window.location.hostname
const PROTOCOL = window.location.protocol
const PORT = '8080'
const TOKEN = () => { return localStorage.getItem('token') }

export const get = async ({ number }, thunkAPI) => {
  try {
    const response = await fetch(
      `${PROTOCOL}//${HOSTNAME}:${PORT}/api/lines/${number}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${TOKEN()}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await response.json()

    if (response.status === 200) {
      return { ...data }
    } else {
      if (response.status === 401) {
        localStorage.removeItem('token')
      }

      return thunkAPI.rejectWithValue(data)
    }
  } catch (e) {
    console.log('Error', e.response.data)
    return thunkAPI.rejectWithValue(e.response.data)
  }
}

export const put = async ({ pattern, callForwardAll }, thunkAPI) => {
  try {
    const response = await fetch(
      `${PROTOCOL}//${HOSTNAME}:${PORT}/api/lines/${pattern}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${TOKEN()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ callForwardAll })
      }
    )
    const data = await response.json()

    if (response.status === 200) {
      return { ...data }
    } else {
      if (response.status === 401) {
        localStorage.removeItem('token')
      }

      return thunkAPI.rejectWithValue(data)
    }
  } catch (e) {
    console.log('Error', e.response.data)
    return thunkAPI.rejectWithValue(e.response.data)
  }
}
