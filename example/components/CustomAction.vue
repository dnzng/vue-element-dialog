<template>
  <div class="CustomAction-wrap">
    <div class="content">{{ msg }}</div>

    <div class="btn-wrap">
      <el-button @click="onCustomNo">Custom Action NO</el-button>
      <el-button type="primary" @click="onCustomOk">Custom Action OK</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomAction',

  props: {
    msg: String,
  },

  methods: {
    onCustomNo() {
      this.$emit('close', 'no', 'NO')
    },
    onCustomOk() {
      this.$emit('close', 'ok', 'OK')
    },
  },
}
</script>

<style scoped>
.CustomAction-wrap {
  text-align: center;
}
.content {
  margin-bottom: 20px;
}
.btn-wrap {
  margin-bottom: 10px;
}
</style>
