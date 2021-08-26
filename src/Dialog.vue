<template>
  <el-dialog :visible.sync="visible" v-bind="elDialogProps" @closed="onClosed">
    <!-- UserComponent have already been registered during Vue.extend -->
    <user-component
      v-bind="userComponentProps"
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
      userComponentProps: {},
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
