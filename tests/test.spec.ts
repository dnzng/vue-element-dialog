import { describe, it, expect } from 'vitest'
import Vue, { ComponentOptions } from 'vue'
import ElementUI from 'element-ui'
import Dialog from '../src'
import { VNode } from 'vue/types/umd'
import { SingleSlotOptions } from '../src/types'
import { NormalizedScopedSlot } from 'vue/types/vnode'

const DialogClass = Dialog(Vue)
Vue.use(ElementUI)
Vue.use(Dialog)

/**
 * @vitest-environment jsdom
 */
it('install', () => {
  const vm = new Vue()
  expect(typeof vm.$dialog).toBe('function')
})

it('should receive a global options', () => {
  const globalOptions = { center: true }
  const instance = new DialogClass(globalOptions)
  expect(instance.globalOptions).toBe(globalOptions)
})

it('should reture an promise-based value', () => {
  const instance = new DialogClass()
  const returnedValue = instance.dialog({
    render: h => h('span', 'Promise')
  })
  expect(returnedValue instanceof Promise).toBe(true)
})

describe('options', () => {
  const defaultSlot: ComponentOptions<Vue> = {
    name: 'slot-default',
    render: h => h('span', 'This is the default slot.')
  }
  const titleSlot: ComponentOptions<Vue> = {
    name: 'slot-title',
    render: (h) => h('span', 'This is the title slot.')
  }
  const footerSlot: ComponentOptions<Vue> = {
    name: 'slot-footer',
    render: (h) => h('span', 'This is the footer slot.')
  }

  it('should recieve an option-based component', async () => {
    const instance = new DialogClass()
    instance.dialog(defaultSlot)

    await Vue.nextTick()

    const { vm } = instance
    const body = vm.$el.querySelector('.el-dialog__body') as HTMLDivElement
    expect(body).not.toBeNull()
    expect(body.innerHTML).toBe('<span>This is the default slot.</span>')
  })

  it('should recieve a component with slot name', async () => {
    const instance = new DialogClass()
    const slotsContent = {
      default: defaultSlot,
      title: titleSlot,
      footer: footerSlot
    }
    instance.dialog(slotsContent)

    await Vue.nextTick()

    const { vm } = instance
    const body = vm.$el.querySelector('.el-dialog__body') as HTMLDivElement
    expect(body).not.toBeNull()
    expect(body.innerHTML).toBe('<span>This is the default slot.</span>')

    const title = vm.$el.querySelector('.el-dialog__header') as HTMLDivElement
    expect(title).not.toBeNull()
    const firstChild = title.firstChild as HTMLSpanElement
    expect(firstChild.outerHTML).toBe('<span>This is the title slot.</span>')

    const footer = vm.$el.querySelector('.el-dialog__footer') as HTMLDivElement
    expect(footer).not.toBeNull()
    expect(footer.innerHTML).toBe('<span>This is the footer slot.</span>')
  })

  it('should receive a component with props data', async () => {
    const instance = new DialogClass()
    const defaultSlotWithPropsData: SingleSlotOptions = {
      propsData: {
        msg: 'Hello'
      },
      component: {
        props: {
          msg: {
            type: String,
            default: ''
          }
        },
        render(h) {
          return h('span', `The value of the msg prop is ${(this as any).msg}.`)
        }
      }
    }
    instance.dialog({
      default: defaultSlotWithPropsData
    })

    await Vue.nextTick()

    const { vm } = instance
    const body = vm.$el.querySelector('.el-dialog__body') as HTMLDivElement
    expect(body.innerHTML).toBe('<span>The value of the msg prop is Hello.</span>')
  })

  it('should inject a close event', async () => {
    const instance = new DialogClass()
    instance.dialog(defaultSlot)

    await Vue.nextTick()

    const { vm } = instance
    const scopedSlots = vm.$children[0].$scopedSlots
    const defaultSlotFn = scopedSlots.default as NormalizedScopedSlot
    const defaultSlotVnode = (defaultSlotFn('') as VNode[])[0]
    const childVm = defaultSlotVnode.componentInstance as Vue
    expect(childVm.$listeners.close).not.toBeNull()
    expect(typeof childVm.$listeners.close).toBe('function')
  })
})
