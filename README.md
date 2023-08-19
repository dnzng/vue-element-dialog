# vue-element-dialog

Provides an imperative call to the [el-dialog](https://element.eleme.cn/#/en-US/component/dialog) component in [element-ui](https://element.eleme.cn/#/en-US) based on vue@2.x.

## Install

```bash
npm i vue-element-dialog element-ui
# or pnpm
pnpm add vue-element-dialog element-ui
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
      this.$dialog(
        // Your component will be shown in the default slot of the el-dialog component.
        MyComponent,
        // props and events configuration for the el-dialog component
        {
          // props
          visible: true,
          title: 'Your Title',
          // events
          opened() {
            console.log('has opened...')
          }
        }
      )
        .then((value) => {
          console.log(value)  // Follow or Like
        })
    }
  }
}
</script>
```

`MyComponent.vue`:

```html
<template>
  <el-main>
    <h1>Hello World</h1>
    <div>
      <el-button type="primary" @click="onLike">Like</el-button>
      <el-button type="primary" @click="onFollow">Follow</el-button>
    </div>
  </el-main>
</template>

<script>
export default {
  name: 'MyComponent',

  props: {
    msg: String
  },
  methods: {
    onLike() {
      this.$emit('close', 'Like')
    },
    onFollow() {
      this.$emit('close', 'Follow')
    }
  }
}
</script>
```

## Options

Supports all of the props, events and slots defined on the [el-dialog](https://element.eleme.cn/#/en-US/component/dialog) componenet.

### slots

There are three ways to be chosen from.

1. Directly passes your component, which will be shown in the default slot. e.g.

```js
this.$dialog(MainComponent)
```

2. Provides an object where each key-value pair represents a slot supported by `el-dialog`. e.g.

```js
this.$dialog({
  default: MainComponent,
  title: TitleComponent,
  footer: FooterComponent
})
```

3. Similar to the second approach, but it supports the components with the `props` definitions. e.g.

```js
this.$dialog({
  default: {
    component: YourComponent,
    propsData: {
      msg: 'Follow and Like it.'
    }
  }
})
```

### props and events

The second parameter is uesd to configure all of the props and events supported by `el-dialog`. e.g.

```js
this.$dialog(YourComponent, {
  // props
  visible: true,
  title: 'your title',
  // events
  opened() {
    console.log('has opened...')
  }
})
```

## Injected Event

The plugin will inject a called `close` event into your component passed to the `el-dialog`. You can call it to close the current opened dialog and pass some values. The eventual state of the promise returned by calling `this.$dialog` will become resolved when calling the `close` event, so you will be able to access the values passed to the `close` event.

Note that due to the limitations of the `resolve` method, the type of the resolved value will vary depending on the number of arguments you pass to the `this.$emit('close', ...)`. The value is `undefined` if you don't pass anything. The value is itself if you pass one. The value is an array of them if you pass more than one. e.g.

```js
this.$emit('close') // the value is `undefined`
this.$emit('close', { foo: 1 }) // the value is itself
this.$emit('close', 'Follow', { number: 99 }) // the value is an array of them.
```

## License

MIT
