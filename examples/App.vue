<script lang="ts">
import { CreateElement } from 'vue'
import Basic from './components/Basic.vue'
import Nest from './components/Nest.vue'

let count = 1
export default {
  name: 'App',

  methods: {
    onBasicOne() {
      this.$dialog(Basic, {
        visible: true,
        title: 'Hello' + count++
      }).then((value: string) => {
        console.log(value)
      })
    },

    onBasicTwo() {
      this.$dialog({
        default: {
          component: Basic,
          propsData: {
            msg: 'This is the default content.'
          }
        },
        title: {
          render: (h: CreateElement) => h('div', 'This is title')
        },
        footer: {
          component: {
            render: (h: CreateElement) => h('div', 'This is footer')
          }
        }
      }, {
        visible: true,
        title: 'Hello' + count++
      }).then((value: string) => {
        console.log(value)
      })
    },

    onNest() {
      this.$dialog(Nest, {
        visible: true,
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
