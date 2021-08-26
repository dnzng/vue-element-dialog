<template>
  <div class="Basic-wrap">
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
      this.$emit('cancel', 'NO')
    },
    onConfirm() {
      this.$emit('confirm', 'OK')
    },
  },
}
</script>

<style scoped>
.Basic-wrap {
  text-align: center;
}
.content {
  margin-bottom: 20px;
}
.btn-wrap {
  margin-bottom: 10px;
}
</style>
