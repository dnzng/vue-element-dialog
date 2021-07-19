<template>
  <div id="app">
    <el-button type="primary" @click="onOpen">Base</el-button>
    <el-button type="primary" @click="onCustomAction">Custom Action</el-button>
  </div>
</template>

<script>
import Base from './components/Base'
import CustomAction from './components/CustomAction'

export default {
  name: 'App',

  methods: {
    onOpen() {
      this.$dialog({
        title: 'Basic',
        content: Base,
        props: {
          msg: 'Hello, Vue.js!',
        },
      })
        .then((val) => {
          console.log('Confirm', val)
        })
        .catch((err) => {
          console.log('Cancel', err)
        })
    },

    onCustomAction() {
      this.$dialog({
        title: 'Custom Action',
        content: CustomAction,
        props: {
          msg: 'Hello, Vue.js!',
        },
        callback: (action, value) => {
          if (action === 'ok') {
            console.log('ok', value)
          } else if (action === 'no') {
            console.log('no', value)
          }
        },
      })
    },
  },
}
</script>
