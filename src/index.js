import DialogDefinition from './Dialog'

let DialogCtor
let globalOptions
let uid = 0
const map = new WeakMap()

function createVM() {
  return new DialogCtor({
    el: document.createElement('div'),
  })
}

function destroy(vm) {
  vm.$destroy()
  vm.$el.parentNode.removeChild(vm.$el)
}

function init(options = {}) {
  const {
    props: componentProps = {},
    content: component = {},
    callback,
    cache = false,
    ...elDialogProps
  } = Object.assign({}, globalOptions, options)

  let vm
  let _resolve
  let _reject

  if (!component._cname) {
    component._cname = component.name ? component.name : `component-id-${uid++}`
  }
  const componentName = component._cname

  // When component is options API,
  // avoid repeatly executing Vue.extend()
  if (!DialogCtor.component(componentName)) {
    DialogCtor.component(componentName, component)
  }

  if (cache && map.has(component)) {
    vm = map.get(component)
  } else {
    vm = createVM()
    if (cache) {
      map.set(component, vm)
    }
  }

  vm.elDialogProps = elDialogProps
  vm.componentName = componentName
  vm.componentProps = componentProps

  vm.callback = (action, ...payload) => {
    if (callback) {
      callback(action, ...payload)
    }

    if (_resolve) {
      if (action === 'confirm') {
        _resolve(...payload)
      } else if (action === 'cancel') {
        _reject(...payload)
      }
    }

    if (!cache) {
      destroy(vm)
      vm = null
    }
  }

  return new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject

    document.body.appendChild(vm.$el)
    vm.$nextTick(() => {
      vm.show()
    })
  })
}

export default function (Vue, options = {}) {
  DialogCtor = Vue.extend(DialogDefinition)
  globalOptions = options
  Vue.prototype.$dialog = init
}
