import type { ComponentInstance, VNode, VNodeData } from 'vue'
import type { ResolvedOptions, EventOptions, DialogInstance, VComponentOptions } from './types'
import { SLOTS_NAMES, VISIBLE_KEY } from './constant'

function isComponent(content: object) {
  return !Object
    .keys(content)
    .some(key => SLOTS_NAMES.includes(key))
}

export function resolveSlots(
  instance: DialogInstance,
  vm: ComponentInstance
) {
  let { content } = instance
  const scopedSlots: VNodeData['scopedSlots'] = {}
  const children: VNode[] = []

  if (content) {
    const resolve = instance.resolve!
    const h = vm.$createElement
    const on = {
      close(...args: any[]) {
        vm.$data.visible = false
        let value
        if (args.length === 0) value = undefined
        else if (args.length === 1) value = args[0]
        else value = args
        resolve(value)
      }
    }
    if (isComponent(content)) {
      content = {
        default: {
          component: content as VComponentOptions,
          propsData: {}
        }
      }
    }
    Object
      .entries(content)
      .forEach(([key, value]) => {
        if (!value.component) {
          value = {
            component: value
          }
        }
        const { propsData = {}, component } = value
        if (component) {
          const vnode = h(component, { props: propsData, on })
          scopedSlots[key] = () => [vnode]
          // the footer slot will only be shown when vm.$slots.footer exists.
          if (key === 'footer') {
            children.push(h('template', { slot: key }, [vnode]))
          }
        }
      })
  }

  return { scopedSlots, children }
}

export function resolveOptions(
  instance: DialogInstance,
  vm: ComponentInstance
): ResolvedOptions {
  const { options: { open, opened, close, closed, ...props } } = instance
  const on: VNodeData['on'] = {}
  const events: EventOptions = { open, opened, close, closed }
  Object.entries(events)
    .filter(([, value]) => value)
    .forEach(([key, value]) => (on[key] = value))

  return {
    props: {
      ...props,
      visible: vm.$data.visible
    },
    on: {
      ...on,
      [VISIBLE_KEY](value) {
        vm.$data.visible = value
      }
    }
  }
}
