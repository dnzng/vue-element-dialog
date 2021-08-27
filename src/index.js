import DialogDefinition from './Dialog'

let DialogCtor
let globalOptions
let uid = 0
let vm

function createVM() {
  vm = new DialogCtor({
    el: document.createElement('div'),
  })
}

function init(options = {}) {
  if (!vm) {
    createVM()
  }

  const {
    props: componentProps = {},
    content: component = {},
    callback,
    ...elDialogProps
  } = Object.assign({}, globalOptions, options)
  let _resolve
  let _reject

  if (!component._cname) {
    component._cname = component.name ? component.name : `component-id-${uid++}`
  }
  const componentName = component._cname
  // When component is options API,
  // avoid multiple executing Vue.extend()
  if (!DialogCtor.component(componentName)) {
    DialogCtor.component(componentName, component)
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
    // destroy user component
    vm.key++
    _resolve = _reject = null
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
