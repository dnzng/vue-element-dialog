import DialogDefinition from './Dialog'

let DialogCtor
let globalOptions
const map = new WeakMap()

function createVM(defaultSlot) {
  return new DialogCtor({
    el: document.createElement('div'),
    components: {
      defaultSlot,
    },
  })
}

function destroy(vm) {
  vm.$destroy()
  vm.$el.parentNode.removeChild(vm.$el)
  vm = null
}

function createDialog(options = {}) {
  let {
    props: defaultSlotProps = {},
    content: defaultSlot = {},
    callback,
    isCached = false,
    ...elDialogProps
  } = Object.assign({}, globalOptions, options)

  let vm
  let _resolve
  let _reject

  if (isCached && map.has(defaultSlot)) {
    vm = map.get(defaultSlot)
  } else {
    vm = createVM(defaultSlot)
    if (isCached) {
      map.set(defaultSlot, vm)
    }
  }

  vm.elDialogProps = elDialogProps
  vm.defaultSlotProps = defaultSlotProps

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

    if (!isCached) {
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
