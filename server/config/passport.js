import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import passport from 'passport'
import parseArgs from 'minimist'
import { Strategy as LocalStrategy } from 'passport-local'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { authController } from '../controllers/index.js'

const args = parseArgs(process.argv.slice(2))

// Load config file
const config = yaml.load(fs.readFileSync(path.resolve(args.config || './config/config.yml'), 'utf8'))

const JwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT.SECRET
  // issuer: 'localhost',
  // audience: 'localhost'
}

passport.use('ldap', new LocalStrategy(authController.ldapLogin))

passport.use('local', new LocalStrategy(authController.localLogin))

passport.use(new JwtStrategy(JwtOptions, authController.jwtLogin))
