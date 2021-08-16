const HOSTNAME = window.location.hostname
const PROTOCOL = window.location.protocol
const PORT = '8080'

export const login = async ({ username, password }, thunkAPI) => {
  try {
    const response = await fetch(
      `${PROTOCOL}//${HOSTNAME}:${PORT}/auth`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      }
    )

    const data = await response.json()

    if (response.status === 200) {
      localStorage.setItem('token', data.token)
      return data
    } else {
      if (response.status === 401) {
        localStorage.removeItem('token')
      }

      return thunkAPI.rejectWithValue(data)
    }
  } catch (e) {
    console.log('Error', e.response.data)
    thunkAPI.rejectWithValue(e.response.data)
  }
}
