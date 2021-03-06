import db from '../db'
import log from '../log'
import { remove, sortBy, findIndex } from 'lodash'
import shortid from 'shortid'
import { devices } from '../devices'

import { providerInterfaces } from '../providers'

const stacks = []

const initStacks = () => {
  db.get('stacks').then((d) => {
    if (d === undefined) {
      stacks.push()
    } else {
      d.map((item, index) => {
        stacks.push(item)
      })
    }
  }).catch(e => console.log(e))
}

const updateStack = (_stack) => {
  switch (!_stack.id) {
    case false:
      stacks[findIndex(stacks, element => element.id === _stack.id)] = _stack
      log('info', 'core/lib/stacks', `Updating ${_stack.id} (${_stack.label})`)
      break
    case true:
      stacks.push({ id: shortid.generate(), ..._stack })
      log('info', 'core/lib/stacks', `Creating ${_stack.id} (${_stack.label})`)
      break
  }
  db.set('stacks', stacks)
  return _stack
}

const deleteStack = (_id) => {
  const removedStack = remove(stacks, (item) => {
    return item.id === _id
  })
  if (!stacks.find((item) => { return item.id === _id })) {
    log('info', 'core/lib/stacks', `Deleted stack ${_id} (${removedStack[0].label})`)
    db.set('stacks', stacks)
    return 'ok'
  } else {
    log('info', 'core/lib/stacks', `Deletion of ${_id} (${removedStack[0].label}) failed.`)
    return 'error'
  }
}

// TODO: Facilitate delays and step timings WITH AN INTERNAL ACTION
const executeStack = (_id) => {
  log('info', 'core/lib/stacks', `Executing stack ${_id} (${stacks.find((stack) => { return stack.id === _id }).label})`)
  sortBy(stacks.find((stack) => { return stack.id === _id }).actions, [(o) => { return o.id }]).map((action) => {
    var device = devices.find((device) => { return device.id === action.deviceid })
    providerInterfaces[providerInterfaces.findIndex((providerInterface) => { return providerInterface.id === device.provider })].providerInterface(device.configuration, action.providerFunctionID, action.parameters)
  })
  return 'executed'
}

export { updateStack, deleteStack, stacks, initStacks, executeStack }
