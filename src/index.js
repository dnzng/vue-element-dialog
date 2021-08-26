import DialogDefinition from './Dialog'

let DialogCtor
let globalOptions
const map = new WeakMap()

function createVM(comp) {
  return new DialogCtor({
    el: document.createElement('div'),
    components: {
      UserComponent: comp,
    },
  })
}

function destroy(vm) {
  vm.$destroy()
  vm.$el.parentNode.removeChild(vm.$el)
  vm = null
}

function createDialog(options = {}) {
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

  if (cache && map.has(component)) {
    vm = map.get(component)
  } else {
    vm = createVM(component)
    if (cache) {
      map.set(component, vm)
    }
  }

  vm.elDialogProps = elDialogProps
  vm.userComponentProps = componentProps

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
  Vue.prototype.$dialog = createDialog
}
