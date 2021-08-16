export const login = async (credentials) => {
  return { ...credentials, type: 'local' }
}

export default {
  login
}
