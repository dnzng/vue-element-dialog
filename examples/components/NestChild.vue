<template>
  <div class="wrapper">
    <div class="content">I am a nested child component</div>
  </div>
</template>

<script>
import NestChild from './NestChild'

export default {
  name: 'NestChild',

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
