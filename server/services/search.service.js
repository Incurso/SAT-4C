import AXL from '../utils/cucm-axl.js'

const axl = new AXL()

export const get = async (pattern) => {
  const lines = await axl.list('Line', { pattern: `${pattern}%`, routePartitionName: 'Internal-Phones' }, ['pattern', 'description', 'routePartitionName', 'alertingName', 'usage'])
  const huntPilots = await axl.list('HuntPilot', { pattern: `${pattern}%`, routePartitionName: 'Internal-Phones' }, ['pattern', 'description', 'routePartitionName', 'alertingName', 'usage'])
  const transPatterns = await axl.list('TransPattern', { pattern: `${pattern}%`, routePartitionName: 'Internal-Phones' }, ['pattern', 'description', 'routePartitionName', 'alertingName', 'usage'])

  const returnValue = await [].concat(lines, huntPilots, transPatterns).sort((a, b) => a.pattern > b.pattern ? 1 : -1)

  if (returnValue.length === 0) throw new Error('Number was not found.')

  return returnValue
}

export default {
  get
}
