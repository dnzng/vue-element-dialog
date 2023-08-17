const SLOTS_NAMES = [
  'default', 'title', 'footer'
]

function isComponent(obj) {
  return obj._Ctor || !Object
    .keys(obj)
    .some(key => SLOTS_NAMES.includes(key))
}

export function resolveSlots(instance, context) {
  let { content } = instance
  const scopedSlots = {}
  const children = []

  if (content) {
    const h = instance.vm.$createElement
    const on = {
      close(...payload) {
        context.visible = false
        instance.resolve(...payload)
      }
    }
    if (isComponent(content)) {
      content = {
        default: {
          component: content,
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
          scopedSlots[key] = () => vnode
          // the footer slot will only be shown when vm.$slots.footer exists.
          if (key === 'footer') {
            children.push(h('template', { slot: key }, [vnode]))
          }
        }
      })
  }

  return { scopedSlots, children }
}

const VISIBLE_KEY = 'update:visible'
export function resolveOptions(instance, context) {
  const { options: { open, opened, close, closed, ...props } } = instance
  const on = {}
  Object.entries({
    open,
    opened,
    close,
    closed
  })
    .filter(([, value]) => value)
    .forEach(([key, value]) => (on[key] = value))

  return {
    props: {
      ...props,
      visible: context.visible
    },
    on: {
      ...on,
      [VISIBLE_KEY](value) {
        context.visible = value
      }
    }
  }
}
