<template>
  <div class="Cache-wrap">
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
  name: 'Base',

  data() {
    return {
      msg: 'Hi, vue-element-dialog',
    }
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
.Cache-wrap {
  text-align: center;
}
.content {
  margin-bottom: 20px;
}
.btn-wrap {
  margin-bottom: 10px;
}
</style>
