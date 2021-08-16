import { login as jwtLogin } from './auth.jwt.service.js'
import { login as ldapLogin } from './auth.ldap.service.js'
import { login as localLogin } from './auth.local.service.js'

export {
  jwtLogin,
  ldapLogin,
  localLogin
}

export default {
  jwtLogin,
  ldapLogin,
  localLogin
}
