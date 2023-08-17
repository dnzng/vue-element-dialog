import { describe, it, expect } from 'vitest'
import Vue from 'vue'
import ElementUI from 'element-ui'
import Dialog from '../src'

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

it('can receive a global options', () => {
  const globalOptions = { center: true }
  const instance = new DialogClass(globalOptions)
  expect(instance.globalOptions).toBe(globalOptions)
})

it('should reture an promise-based value', () => {
  const instance = new DialogClass()
  const returnedValue = instance.dialog({
    render: (h) => h('div', 'test')
  })
  expect(returnedValue instanceof Promise).toBe(true)
})

describe('options', () => {
  const defaultSlot = {
    name: 'slot-default',
    render: h => h('span', 'This is the default slot.')
  }
  const titleSlot = {
    name: 'slot-title',
    render: (h) => h('span', 'This is the title slot.')
  }
  const footerSlot = {
    name: 'slot-footer',
    render: (h) => h('span', 'This is the footer slot.')
  }

  it('can recieve an option-based component', async () => {
    const instance = new DialogClass()
    instance.dialog(defaultSlot)

    await Vue.nextTick()

    const { vm } = instance
    const body = vm.$el.querySelector('.el-dialog__body')
    expect(body).not.toBeNull()
    expect(body.innerHTML).toBe('<span>This is the default slot.</span>')
  })

  it('can recieve a component with slot name', async () => {
    const instance = new DialogClass()
    const slotsContent = {
      default: defaultSlot,
      title: titleSlot,
      footer: footerSlot
    }
    instance.dialog(slotsContent)

    await Vue.nextTick()

    const { vm } = instance
    const body = vm.$el.querySelector('.el-dialog__body')
    expect(body).not.toBeNull()
    expect(body.innerHTML).toBe('<span>This is the default slot.</span>')

    const title = vm.$el.querySelector('.el-dialog__header')
    expect(title).not.toBeNull()
    expect(title.firstChild.outerHTML).toBe('<span>This is the title slot.</span>')

    const footer = vm.$el.querySelector('.el-dialog__footer')
    expect(footer).not.toBeNull()
    expect(footer.innerHTML).toBe('<span>This is the footer slot.</span>')
  })

  it('can receive a component with props data', async () => {
    const instance = new DialogClass()
    const defaultSlotWithPropsData = {
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
          return h('span', `The value of the msg prop is ${this.msg}.`)
        }
      }
    }
    instance.dialog({
      default: defaultSlotWithPropsData
    })

    await Vue.nextTick()

    const body = instance.vm.$el.querySelector('.el-dialog__body')
    expect(body.innerHTML).toBe('<span>The value of the msg prop is Hello.</span>')
  })

  it('should inject a close event', async () => {
    const instance = new DialogClass()
    instance.dialog(defaultSlot)

    await Vue.nextTick()

    const scopedSlots = instance.vm.$children[0].$scopedSlots
    const vnode = scopedSlots.default()[0]
    const vm = vnode.componentInstance
    expect(vm.$listeners.close).not.toBeNull()
    expect(typeof vm.$listeners.close).toBe('function')
  })
})
