<script>
import Basic from './components/Basic.vue'
import Nest from './components/Nest.vue'

let count = 1
export default {
  name: 'App',

  methods: {
    onBasicOne() {
      this.$dialog(Basic, {
        title: 'Hello' + count++
      }).then(value => {
        console.log(value)
      })
    },

    onBasicTwo() {
      this.$dialog({
        default: {
          component: Basic,
          propsData: {
            msg: 'I am default content.'
          }
        },
        title: {
          render: (h) => h('div', 'This is title')
        },
        footer: {
          component: {
            render: (h) => h('div', 'This is footer')
          }
        }
      }, {
        title: 'Hello' + count++,
        visible: false
      }).then(value => {
        console.log(value)
      })
    },

    onNest() {
      this.$dialog(Nest, {
        title: 'Nest'
      })
    }
  }
}
</script>

<template>
  <div id="app">
    <el-button type="primary" @click="onBasicOne">
      Basic One
    </el-button>
    <el-button type="primary" @click="onBasicTwo">
      Basic Two
    </el-button>
    <el-button type="primary" @click="onNest">
      Nest
    </el-button>
  </div>
</template>

<style>
#app {
  padding: 10px;
}
</style>
