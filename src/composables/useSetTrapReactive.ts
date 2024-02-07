// @ts-nocheck
import { getCurrentInstance, reactive } from 'vue'

export default (target: Object[]) => {
  const internalInstance = getCurrentInstance()
  if (!internalInstance) {
    throw new Error('useObjectModel must be used within a component')
  }

  const value = reactive(new Proxy(target, {
    get (target, key) {
      console.log('getting', target, key, target[key])
      return target[key]
    },
    set (object, key, value) {
      console.log('setting', object, key, object[key])
      object[key] = value
      internalInstance.emit('show-snackbar', 'direct initial object prop mutation detected')
      return true
    }
  }))

  return value
}
