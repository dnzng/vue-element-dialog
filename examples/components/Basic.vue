<template>
  <div class="wrapper">
    <div class="content">
      {{ msg }}
    </div>
    <div class="btn-wrap">
      <el-button @click="onCancel">Cancel</el-button>
      <el-button type="primary" @click="onConfirm">Confirm</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Basic',

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
