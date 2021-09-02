<template>
  <el-dialog :visible.sync="visible" v-bind="elDialogProps" @closed="onClosed">
    <!-- User Component have already been registered during creating dialog -->
    <component
      :is="componentName"
      v-bind="componentProps"
      @close="close"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </el-dialog>
</template>

<script>
export default {
  name: 'ImperativeElDialog',

  data() {
    return {
      visible: false,
      elDialogProps: {},
      componentName: '',
      componentProps: {},
    }
  },

  methods: {
    show() {
      this.visible = true
    },
    close(...payload) {
      // Do not covert to reactive.
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
