import { computed, getCurrentInstance } from 'vue'

// > It is a common use case and you're correct that modifying the original object is not generally considered best
// practice. But in the vast majority of cases it's trivial to do a shallow clone and just emit a new object. I did
// write something about a similar topic at https://skirtles-code.github.io/vue-examples/patterns/computed-v-model,
// but I was trying to show some specific ideas and don't actually cover the simple case of emitting a shallow copy
// in that article. - skirtle

// https://skirtles-code.github.io/vue-examples/patterns/computed-v-model#advanced-usage-proxying-objects
// https://github.com/skirtles-code/vue-examples/tree/main

export default (props: any, propKey: string) => {
  const internalInstance = getCurrentInstance()
  if (!internalInstance) {
    throw new Error('useObjectModel must be used within a component')
  }

  const model = computed({
    get() {
      return new Proxy(props[propKey], {
        set(obj, key, value) {
          model.value = {
            ...obj,
            [key]: value
          }
          return true
        }
      })
    },
    set(newValue) {
      internalInstance!.emit(`update:${propKey}`, newValue)
    }
  })
  return model
}
