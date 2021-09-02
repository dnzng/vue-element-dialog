<template>
  <div class="wrapper">
    <div class="content">A CustomAction Demo</div>
    <div class="btn-wrap">
      <el-button @click="onCustomNo">Custom Action NO</el-button>
      <el-button type="primary" @click="onCustomOk">Custom Action OK</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomAction',

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
