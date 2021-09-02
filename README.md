# vue-element-dialog

An imperative dialog for [el-dialog](https://element.eleme.cn/#/en-US/component/dialog) in [element-ui](https://element.eleme.cn/#/en-US) based on vue@2.x

## Installation

```bash
yarn add vue-element-dialog element-ui
# or
npm i vue-element-dialog element-ui
```

## Usage

### Register

```js
import Vue from 'vue' // vue@2.x
import ElementUI from 'element-ui'
import VueElementDialog from 'vue-element-dialog'
import 'element-ui/lib/theme-chalk/index.css'
 
Vue.use(ElementUI)
Vue.use(VueElementDialog, { center: true })
```

### Invoking

`App.vue`:

```html
<template>
  <div id="app">
    <el-button type="primary" @click="onOpen">onOpen</el-button>
  </div>
</template>

<script>
import MyComponent from 'path/to/MyComponent.vue'

export default {
  name: 'App',

  methods: {
    onOpen() {
      this.$dialog({
        title: 'Hello',
        content: MyComponent,
        props: {
          msg: 'Hello, Vue.js'
        }
      }).then((val) => {
        console.log(val)  // OK
      }).catch((err) => {
        console.log(err) // NO
      })
    }
  }
}
</script>
```

`MyComponent.vue`:

```html
<template>
  <div class="my-component">
    <p>{{ msg }}</p>
    <div>
      <el-button type="primary" @click="onCancel">Cancel</el-button>
      <el-button type="primary" @click="onConfirm">Confirm</el-button>
    </div>
  </div>
<template>

<script>
export default {
  name: 'MyComponent',

  props: {
    msg: String
  },
  methods: {
    onCancel() {
      this.$emit('cancel', 'NO')
    },
    onConfirm() {
      this.$emit('confirm', 'OK')
    }
  }
}
</script>
```

## Options

Support all attributes except `visible` on [el-dialog](https://element.eleme.cn/#/en-US/component/dialog) and do not support `slot` and `events`.

### Special options

#### content
Required: `true`<br>
Type: `Object`<br>
Default: `{}`

To display content in dialog.

#### props
Required: `false`<br>
Type: `Object`<br>
Default: `{}`

Declared props data of content option.


#### cache
Required: `false`<br>
Type: `Boolean`<br>
Default: `false`

Whether to cache el-dialog instance.


#### callback(action, param1, ...)
Required: `false`<br>
Type: `Function`<br>

Triggers when to execute an action. You can customize an action by associating with `this.$close()` while `resolve` and `reject` will be invalid. e.g:

```js
this.$emit('close', 'myAction', param1, ...)
```

## Events

You can invoke them in your component to execute an action for dialog while passing on some parameters.

- `confirm`: a "confirm" action to resolve. e.g: `this.$emit('confirm', param1, ....)`
- `cancel`: a "cancel" action to reject. e.g: `this.$emit('cancel', param1, ....)`
- `close`: just close the current dialog, e.g: `this.$emit('close')`

## License

MIT
