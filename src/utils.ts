import type { ComponentInstance, VNode, VNodeData } from 'vue'
import type {
  ResolvedOptions, EventOptions, DefaultFunction,
  Dialog, DComponentOptions
} from './types'
import { SLOTS_NAMES, VISIBLE_KEY } from './constant'

function isComponent(content: object) {
  return !Object
    .keys(content)
    .some(key => SLOTS_NAMES.includes(key))
}

export function resolveSlots(
  instance: Dialog,
  vm: ComponentInstance
) {
  let { content } = instance
  const scopedSlots: VNodeData['scopedSlots'] = {}
  const children: VNode[] = []

  if (content) {
    const resolve = instance.resolve as DefaultFunction
    const h = vm.$createElement
    const on = {
      close(...payload: any[]) {
        vm.$data.visible = false
        resolve(...payload)
      }
    }
    if (isComponent(content)) {
      content = {
        default: {
          component: content as DComponentOptions,
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
  instance: Dialog,
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
