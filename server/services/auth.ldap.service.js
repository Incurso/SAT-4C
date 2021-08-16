import fs from 'fs'
import ldap from 'ldapjs'
import path from 'path'
import yaml from 'js-yaml'
import parseArgs from 'minimist'

const args = parseArgs(process.argv.slice(2))

// Load config file
const config = yaml.load(fs.readFileSync(path.resolve(args.config || './config/config.yml'), 'utf8'))

const authenticate = (credentials) => {
  return new Promise((resolve, reject) => {
    const client = ldap.createClient({
      url: config.LDAP.HOSTS.map((host) => `ldap://${host}`)
    })

    client.bind(`${credentials.username}${config.LDAP.UPN}`, credentials.password, async (err) => {
      if (err) {
        let error

        switch (err.code) {
          case 49:
            error = new Error('Wrong username and/or password.')
            break
          case 'DEPTH_ZERO_SELF_SIGNED_CERT':
            error = new Error('Certificate mismatch')
            break
          default:
            error = new Error(`Something went wrong (${err.code})`)
        }

        client.destroy(err)
        return reject(error)
      }

      return authorize(client, credentials.username)
        .then((user) => { resolve(user) })
        .catch((err) => { reject(err) })
    })
  })
}

const authorize = async (client, username) => {
  let filter = `(&(objectCategory=group)(|${config.LDAP.GROUPS.map((group) => `(name=${group})`).join('')}))`

  const groups = await ldapSearch(client, filter)

  filter = `(&(objectCategory=user)(samAccountName=${username})(|${groups.map((group) => `(memberOf:1.2.840.113556.1.4.1941:=${group.dn})`).join('')}))`

  const user = await ldapSearch(client, filter)

  if (user.length !== 1) {
    await client.unbind()
    throw new Error('access denied')
  }

  // Create directory for user images if it does not exist
  fs.mkdirSync('./public/images/users', { recursive: true }, async (err) => {
    await client.unbind()
    throw new Error(err.message)
  })

  // Save thumbnailPhoto as a file
  try {
    fs.writeFileSync(`./public/images/users/${user[0].sAMAccountName}.jpg`, user[0].thumbnailPhoto)
  } catch (err) {
    await client.unbind()
    console.trace(err.message)
    throw new Error(err.message)
  }

  await client.unbind()
  return ({
    username: user[0].sAMAccountName,
    name: user[0].displayName,
    email: user[0].mail,
    image: `/images/users/${user[0].sAMAccountName}.jpg`
  })
}

function ldapSearch (client, filter) {
  const entries = []

  const customeParser = (entry, raw, callback) => { if (Object.getOwnPropertyDescriptor(raw, 'thumbnailPhoto')) { entry.thumbnailPhoto = raw.thumbnailPhoto } callback(entry) }

  function getProperObject (entry) {
    const obj = {
      dn: entry.dn.toString(),
      controls: []
    }
    entry.attributes.forEach(function (a) {
      const buf = a.buffers
      const val = a.vals
      let item
      if (a.type === 'thumbnailPhoto') {
        item = buf
      } else {
        item = val
      }
      if (item && item.length) {
        if (item.length > 1) {
          obj[a.type] = item.slice()
        } else {
          obj[a.type] = item[0]
        }
      } else {
        obj[a.type] = []
      }
    })
    entry.controls.forEach(function (element, index, array) {
      obj.controls.push(element.json)
    })
    return obj
  }

  return new Promise((resolve, reject) => {
    client.search(config.LDAP.BASE_DN, { filter: filter, scope: 'sub', attributes: [], entryParser: customeParser }, (err, res) => {
      if (err) {
        client.unbind()
        reject(err.message)
      }

      res.on('searchRequest', (searchRequest) => {
      })
      res.on('searchEntry', (entry) => {
        entries.push(getProperObject(entry))
      })
      res.on('searchReference', (referral) => {
      })
      res.on('error', async (err) => {
        console.error('error: ' + err.message)
        await client.unbind()
        reject(err.message)
      })
      res.on('end', (result) => {
        resolve(entries)
      })
    })
  })
}

export const login = async (credentials) => {
  return await authenticate(credentials)
    .then((user) => { return { ...user, type: 'LDAP' } })
    .catch((err) => { console.log('SERVICE', err.message); throw new Error(err.message) })
}

export default {
  login
}
