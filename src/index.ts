import type { ComponentInstance, CreateElement, VueConstructor } from 'vue'
import type { UserOptions, ContentOptions, DefaultFunction, VComponentOptions } from './types'
import { resolveOptions, resolveSlots } from './utils'

export default function Dialog(Vue: VueConstructor) {
  return class Dialog {
    globalOptions: UserOptions
    options: UserOptions
    vm: ComponentInstance | null
    content?: ContentOptions | undefined
    resolve?: DefaultFunction | undefined
    reject?: DefaultFunction | undefined

    constructor(options: UserOptions = {}) {
      this.globalOptions = options
      this.options = {}
      this.vm = null
    }

    dialog(
      content: ContentOptions,
      options: UserOptions = {}
    ): Promise<any> {
      if (!content || typeof content !== 'object' || !Object.keys(content).length) {
        return Promise.reject(new Error('The content shown in \'el-dialog\' component cannot be empty'))
      }

      this.options = Object.assign({}, options, this.globalOptions)
      this.content = content

      if (!this.vm) {
        this.vm = this.getInstance()
      }

      const vm = this.vm as ComponentInstance
      document.body.appendChild(vm.$el)
      vm.$data.visible = this.options.visible

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    }

    getInstance(): ComponentInstance {
      const component = this.createComponent()
      const DialogCtor = Vue.extend(component)
      return new DialogCtor().$mount()
    }

    createComponent(): VComponentOptions {
      const instance = this
      return {
        data() {
          return {
            visible: false
          }
        },
        render(this: ComponentInstance, h: CreateElement) {
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
        },
        // only used to test
        destroyed() {
          console.log('destroyed')
        }
      }
    }

    destroy() {
      const { vm } = this
      if (!vm) return true
      // remove vm.$el
      if (vm.$el && vm.$el.parentNode) {
        vm.$el.parentNode.removeChild(vm.$el)
      }
      // recursively destroy component instances
      vm.$destroy()
      // reset properties
      this.vm = null
    }
  }
}

Dialog.install = (Vue: VueConstructor, options: UserOptions = {}) => {
  const DialogClass = Dialog(Vue)
  const dialog = new DialogClass(options)
  Vue.prototype.$dialog = dialog.dialog.bind(dialog)
}
