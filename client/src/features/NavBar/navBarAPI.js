const HOSTNAME = window.location.hostname
const PROTOCOL = window.location.protocol
const PORT = window.location.port
const TOKEN = () => { return localStorage.getItem('token') }

export const getUser = async (thunkAPI) => {
  try {
    const response = await fetch(
      `${PROTOCOL}//${HOSTNAME}:${PORT}/auth`,
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
