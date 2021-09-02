<template>
  <div id="app">
    <el-button type="primary" @click="onBasic">Basic</el-button>
    <el-button type="primary" @click="onNest">Nest</el-button>
    <el-button type="primary" @click="onCache">Cache</el-button>
    <el-button type="primary" @click="onCustomAction">Custom Action</el-button>
  </div>
</template>

<script>
import Basic from './components/Basic'
import Nest from './components/Nest'
import Cache from './components/Cache'
import CustomAction from './components/CustomAction'

export default {
  name: 'App',

  methods: {
    onBasic() {
      this.$dialog({
        title: 'Basic',
        content: Basic,
        props: {
          msg: 'A Basic Demo.',
        },
      })
        .then((val) => {
          this.$message(`Confirm: ${val}`)
        })
        .catch((err) => {
          this.$message(`Cancel: ${err}`)
        })
    },

    onNest() {
      this.$dialog({
        title: 'Nest',
        content: Nest,
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
        .catch((val) => {
          this.$message(`Cancel: ${val}`)
        })
    },

    onCustomAction() {
      this.$dialog({
        title: 'Custom Action',
        content: CustomAction,
        callback: (action, value) => {
          if (action === 'ok') {
            this.$message(`Custom Action: ${action}; Value: ${value}`)
          } else if (action === 'no') {
            this.$message(`Custom Action: ${action}; Value: ${value}`)
          }
        },
      })
    },
  },
}
</script>

<style>
#app {
  padding: 10px;
}
</style>
