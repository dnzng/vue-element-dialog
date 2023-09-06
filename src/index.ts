import type { ComponentInstance, CreateElement, VueConstructor } from 'vue'
import type { UserOptions, ContentOptions, DefaultFunction, VComponentOptions } from './types'
import { resolveOptions, resolveSlots } from './utils'

function Dialog(Vue: VueConstructor) {
  return class Dialog {
    public options: UserOptions
    public content: ContentOptions
    public vm: ComponentInstance | null = null
    public resolve?: DefaultFunction
    public reject?: DefaultFunction

    constructor(
      public readonly globalOptions: UserOptions = {},
      public readonly rootOptions: VComponentOptions = {}
    ) {
      this.options = {}
      this.content = {}
    }

    dialog(
      content: ContentOptions,
      userOptions: UserOptions = {}
    ): Promise<any> {
      if (!content || typeof content !== 'object' || !Object.keys(content).length) {
        throw new Error('The content shown in \'el-dialog\' component cannot be empty')
      }

      this.options = Object.assign({}, this.globalOptions, userOptions)
      this.content = content

      if (!this.vm) {
        this.vm = this.getInstance()
      }

      const vm = this.vm
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
      const vm = new DialogCtor().$mount()
      return vm
    }

    createComponent(): VComponentOptions {
      const instance = this
      const options: VComponentOptions = {
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
        }
      }
      // avoid that the data and render options are overrided by user's rootOptions.
      return Object.assign({}, this.rootOptions, options)
    }

    destroy() {
      const { vm } = this
      if (!vm) return true
      // remove vm.$el from document.body
      if (vm.$el && vm.$el.parentNode) {
        vm.$el.parentNode.removeChild(vm.$el)
      }
      // recursively destroy component instances
      vm.$destroy()
      // reset properties
      this.vm = null
      return true
    }
  }
}

Dialog.install = (Vue: VueConstructor, globalOptions?: UserOptions) => {
  const DialogClass = Dialog(Vue)
  const dialog = new DialogClass(globalOptions)
  Vue.prototype.$dialog = dialog.dialog.bind(dialog)
}

export default Dialog
