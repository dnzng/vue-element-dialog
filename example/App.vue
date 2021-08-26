<template>
  <div id="app">
    <el-button type="primary" @click="onOpen">Basic</el-button>
    <el-button type="primary" @click="onCustomAction">Custom Action</el-button>
    <el-button type="primary" @click="onCache">Cache</el-button>
  </div>
</template>

<script>
import Basic from './components/Basic'
import CustomAction from './components/CustomAction'
import Cache from './components/Cache'

export default {
  name: 'App',

  methods: {
    onOpen() {
      this.$dialog({
        title: 'Basic',
        content: Basic,
        props: {
          msg: 'Hello, vue-element-dialog!',
        },
      })
        .then((val) => {
          console.log(`Confirm: ${val}`)
        })
        .catch((err) => {
          console.log(`Cancel: ${err}`)
        })
    },

    onCustomAction() {
      this.$dialog({
        title: 'Custom Action',
        content: CustomAction,
        props: {
          msg: 'Hello, vue-element-dialog!',
        },
        callback: (action, value) => {
          if (action === 'ok') {
            this.$message(`Custom Action: ${action}; Value: ${value}`)
          } else if (action === 'no') {
            this.$message(`Custom Action: ${action}; Value: ${value}`)
          }
        },
      })
    },

    onCache() {
      this.$dialog({
        title: 'Cache',
        content: Cache,
        cache: true,
      })
        .then((val) => {
          this.$message(`Confirm: ${val}`)
        })
        .catch((err) => {
          this.$message(`Cancel: ${err}`)
        })
    },
  },
}
</script>
