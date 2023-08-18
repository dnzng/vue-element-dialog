# vue-element-dialog

Provide an imperative [el-dialog](https://element.eleme.cn/#/en-US/component/dialog) in [element-ui](https://element.eleme.cn/#/en-US) based on vue@2.x.

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

Support all of props, events and slots defined on the [el-dialog](https://element.eleme.cn/#/en-US/component/dialog).

### slots

There are three styles to be choosed.

1. Directly passes your component to it, which will be shown in the default slot. e.g:

```js
this.$dialog(MainComponent)
```

2. Provides an object whose each pair of key-value represents a slot supported by `el-dialog`. e.g:

```js
this.$dialog({
  default: MainComponent,
  title: TitleComponent,
  footer: FooterComponent
})
```

3. Similar to the second, but it supports the components with the props definition. 

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

The second parameter is uesd to configure all of props and events supported by `el-dialog`. e.g:

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

The plugin will inject an called `close` event into your component passed into the `el-dialog`, 
so you could call it to close the current dialog and pass values to where you called it.

Since the returned value is a promise-based value, you will be able to access the values 
passed to the `close` event. 

```js
this.$emit('close', 'Follow and Like')
```

## License

MIT
