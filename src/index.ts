import type { VueConstructor } from 'vue'
import type {
  UserOptions, ContentOptions,
  DialogComponent, DialogComponentOptions,
  DefaultFunction
} from './types'
import { resolveOptions, resolveSlots } from './utils'

export default function Dialog(Vue: VueConstructor) {
  return class Dialog {
    readonly globalOptions: UserOptions
    options: UserOptions
    vm: DialogComponent
    content?: ContentOptions | undefined
    resolve?: DefaultFunction | undefined
    reject?: DefaultFunction | undefined

    constructor(options: UserOptions = {}) {
      this.globalOptions = options
      this.options = {}
      this.vm = this.createVueInstance()
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

      const vm = this.vm
      document.body.appendChild(vm.$el)
      vm.visible = true

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    }

    createVueInstance(): DialogComponent {
      if (this.vm) return this.vm

      const component = this.createComponent()
      const DialogCtor = Vue.extend(component)
      return new DialogCtor().$mount()
    }

    createComponent(): DialogComponentOptions {
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

Dialog.install = (Vue: VueConstructor, options: UserOptions = {}) => {
  const DialogClass = Dialog(Vue)
  const dialog = new DialogClass(options)
  Vue.prototype.$dialog = dialog.dialog.bind(dialog)
}
