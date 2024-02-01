// @ts-nocheck
import { getCurrentInstance, ref } from 'vue'

export default (target: Object) => {
  const internalInstance = getCurrentInstance()
  if (!internalInstance) {
    throw new Error('useObjectModel must be used within a component')
  }

  const value = ref(new Proxy(target, {
    set (object, key, value) {
      object[key] = value
      internalInstance.emit('show-snackbar', 'direct initial object prop mutation detected')
      return true
    }
  }))

  return value
}
