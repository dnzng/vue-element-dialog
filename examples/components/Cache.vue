<template>
  <div class="wrapper">
    <div class="content">
      <el-input v-model="msg" />
    </div>
    <div class="btn-wrap">
      <el-button @click="onCancel">Cancel</el-button>
      <el-button type="primary" @click="onConfirm">Confirm</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cache',

  data() {
    return {
      msg: 'Hi',
    }
  },

  methods: {
    onCancel() {
      this.$nextTick(() => {
        this.msg = 'Hi'
      })
      this.$emit('cancel', 'NO')
    },
    onConfirm() {
      this.$emit('confirm', this.msg)
    },
  },
}
</script>
