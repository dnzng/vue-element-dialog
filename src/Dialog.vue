<template>
  <el-dialog :visible.sync="visible" v-bind="elDialogProps" @closed="onClosed">
    <!-- DefaultSlot Component have already been registered during Vue.extend -->
    <default-slot
      v-bind="defaultSlotProps"
      @close="close"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </el-dialog>
</template>

<script>
export default {
  name: 'ImperativeDialog',

  data() {
    return {
      visible: false,
      elDialogProps: {},
      defaultSlotProps: {},
    }
  },

  methods: {
    show() {
      this.visible = true
    },
    close(...payload) {
      // 不需要转成响应式
      this.payload = payload
      this.visible = false
    },
    onConfirm(...payload) {
      this.close('confirm', ...payload)
    },
    onCancel(...payload) {
      this.close('cancel', ...payload)
    },
    onClosed() {
      const payload = this.payload ? this.payload : []
      this.callback(...payload)
    },
  },
}
</script>
