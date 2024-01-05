<template>
  <div class="mouse-flashlight">
    <MouseDirectionMask></MouseDirectionMask>
  </div>
</template>

<script>
import MouseDirectionMask from "@/components/MouseDirectionMask/mouse-direction-mask";
export default {
  name: 'mouse-flashlight',
  data() {
    return {

    }
  },
  components: {
    MouseDirectionMask
  }
}
</script>

<style lang="scss" scoped></style>