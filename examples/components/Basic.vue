<script>
export default {
  name: 'Basic',

  props: {
    msg: String
  },

  methods: {
    onCancel() {
      // eslint-disable-next-line
      this.$emit('close', 'NO')
    },
    onConfirm() {
      // eslint-disable-next-line
      this.$emit('close', 'OK')
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
      <el-button @click="onCancel">
        Cancel
      </el-button>
      <el-button type="primary" @click="onConfirm">
        Confirm
      </el-button>
    </div>
  </div>
</template>
