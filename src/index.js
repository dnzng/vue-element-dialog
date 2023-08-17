import { resolveOptions, resolveSlots } from './utils'

export default function Dialog(Vue) {
  return class Dialog {
    constructor(options = {}) {
      this.globalOptions = options
      this.options = {}
      this.createInstance()
    }

    dialog(content, options = {}) {
      this.options = Object.assign({}, options, this.globalOptions)
      this.content = content

      const { vm } = this
      document.body.appendChild(vm.$el)
      vm.visible = true

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    }

    createInstance() {
      if (!this.vm) {
        const component = this.createComponent()
        const DialogCtor = Vue.extend(component)
        this.vm = new DialogCtor().$mount()
      }
    }

    createComponent() {
      const instance = this
      return {
        data() {
          return {
            visible: false
          }
        },
        render(h) {
          const { props, on } = resolveOptions(instance, this)
          const { scopedSlots, children } = resolveSlots(instance, this)
          return h(
            'ElDialog',
            {
              props,
              on,
              scopedSlots
            },
            children
          )
        }
      }
    }
  }
}

Dialog.install = (Vue, options = {}) => {
  const DialogClass = Dialog(Vue)
  const dialog = new DialogClass(options)
  Vue.prototype.$dialog = dialog.dialog.bind(dialog)
}
