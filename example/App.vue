<template>
  <div id="app">
    <el-button type="primary" @click="onBasic">Basic</el-button>
    <el-button type="primary" @click="onCustomAction">Custom Action</el-button>
  </div>
</template>

<script>
import Basic from './components/Basic'
import CustomAction from './components/CustomAction'

export default {
  name: 'App',

  methods: {
    onBasic() {
      this.$dialog({
        title: 'Basic',
        content: Basic,
        props: {
          title: 'A basic example.',
        },
      })
        .then((val) => {
          this.$message(`Confirm: ${val}`)
        })
        .catch((err) => {
          this.$message(`Cancel: ${err}`)
        })
    },

    onCustomAction() {
      this.$dialog({
        title: 'Custom Action',
        content: CustomAction,
        props: {
          title: 'A custom action example.',
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
  },
}
</script>
