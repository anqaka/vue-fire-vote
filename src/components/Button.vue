<template>
  <button
    :type="type"
    :class="['button', className]"
    @click="btnEvent($event)"
  >
    <slot />
  </button>
</template>
<script>
export default {
  props: {
    className: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: false,
      default: 'button'
    }
  },
  methods: {
    btnEvent (ev) {
      this.$emit('btn-event', ev)
    }
  }
}
</script>
