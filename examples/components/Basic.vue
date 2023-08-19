<script lang="ts">
export default {
  name: 'Basic',

  props: {
    msg: String
  },

  methods: {
    onLike() {
      // eslint-disable-next-line
      this.$emit('close', 'Like')
    },
    onFollow() {
      // eslint-disable-next-line
      this.$emit('close', 'Follow', 'I has already followed')
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="content">
      {{ msg }}
    </div>
    <div class="btn-wrap">
      <el-button @click="onLike">
        Like
      </el-button>
      <el-button type="primary" @click="onFollow">
        Follow
      </el-button>
    </div>
  </div>
</template>
