<template>
  <div class="wrapper">
    <div class="content">I am a parent component</div>
    <el-button type="primary" @click="onNest">nest child</el-button>
  </div>
</template>

<script>
import NestChild from './NestChild'

export default {
  name: 'Nest',

  methods: {
    onNest() {
      this.$dialog({
        title: 'Nest child',
        content: NestChild,
      })
    },
  },
}
</script>
