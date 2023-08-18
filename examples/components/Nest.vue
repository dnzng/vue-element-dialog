<script lang="ts">
export default {
  name: 'Nest',

  data() {
    return {
      innerVisible: false
    }
  }
}
</script>

<template>
  <!-- eslint-disable -->
  <div>
    <el-dialog
      width="30%"
      title="Inner Dialog"
      :visible.sync="innerVisible"
      append-to-body
    />
    <div style="text-align: center;">
      <el-button @click="$emit('close')"> Cancel </el-button>
      <el-button type="primary" @click="innerVisible = true">Open the Inner Dialog</el-button>
    </div>
  </div>
</template>
