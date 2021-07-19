<template>
  <div id="app">
    <el-button type="primary" @click="onOpen">open</el-button>
  </div>
</template>

<script>
import Base from './components/Base'

export default {
  name: 'App',

  methods: {
    onOpen() {
      this.$dialog({
        title: 'Basic',
        width: '400px',
        // cache: true,
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
  },
}
</script>
