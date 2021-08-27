<template>
  <div class="wrapper">
    <div class="title">{{ title }}</div>
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
  name: 'Basic',

  props: {
    title: String,
  },

  data() {
    return {
      msg: 'Hi',
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
