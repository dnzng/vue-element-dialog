import { ComponentInstance, CreateElement, VueConstructor } from 'vue'
import type { UserOptions, ContentOptions, DefaultFunction, DComponentOptions } from './types'
import { resolveOptions, resolveSlots } from './utils'

export default function Dialog(Vue: VueConstructor) {
  return class Dialog {
    readonly globalOptions: UserOptions
    options: UserOptions

    DialogCtor: VueConstructor
    vm: ComponentInstance

    content?: ContentOptions | undefined
    resolve?: DefaultFunction | undefined
    reject?: DefaultFunction | undefined

    constructor(options: UserOptions = {}) {
      this.globalOptions = options
      this.options = {}
      const component = this.createComponent()
      const DialogCtor = this.DialogCtor = Vue.extend(component)
      this.vm = new DialogCtor().$mount()
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
      vm.$data.visible = true

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    }

    createComponent(): DComponentOptions {
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
