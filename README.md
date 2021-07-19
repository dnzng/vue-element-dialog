# vue-element-dialog

An imperative dialog for `el-dialog` in `element-ui` based on vue@2

## Install

```bash
yarn add vue2-element-dialog
# or
npm i vue2-element-dialog
```

## Usage

### Register

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueElementDialog from 'vue2-element-dialog'
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
        console.log(val)  // ok
      }).catch(() => {
        console.log('cancel)
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
      this.$emit('cancel')
    },
    onConfirm() {
      this.$emit('confirm', 'ok')
    }
  }
}
</script>
```

## Option

Support all attributes except `visible` on [el-dialog](https://element.eleme.cn/#/en-US/component/dialog) and do not support `slot` and `events`

### Special options

- content: required, to display content in dialog
- props: declared props of content
- cache: whether to cache instance of dialog, default is false

## Events

You can invoke them in your component to determine a status of dialog while passing on parameters.

- `confirm`: a "confirm" status, `this.$emit('confirm', param1, ....)`
- `cancel`: a "cancel" status, `this.$emit('cancel', param1, ....)`
- `close`: just want to close the current dialog, `this.$emit('close')`
