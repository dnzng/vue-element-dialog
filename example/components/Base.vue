<template>
  <div class="base-wrap">
    <div class="content">{{ msg }}</div>
    <div class="btn-wrap">
      <el-button @click="onCancel">Cancel</el-button>
      <el-button type="primary" @click="onConfirm">Confirm</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Base',

  props: {
    msg: String,
  },

  methods: {
    onCancel() {
      this.$emit('cancel', 'cancel')
    },
    onConfirm() {
      this.$emit('confirm', true)
    },
  },
}
</script>

<style scoped>
.base-wrap {
  text-align: center;
}
.content {
  margin-bottom: 20px;
}
</style>
