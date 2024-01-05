<template>
  <div class="underline-effect">
    <div class="">
      <h3>表单下划线</h3>
      <underline type="input" inputType="text" placement='middle-to-both'></underline>
      <br>
      <br>
      <underline type="input" inputType="text" placement='left-to-right'></underline>
      <br>
      <br>
      <underline type="input" inputType="text" placement='right-to-left'></underline>
    </div>
    <div class="">
      <h3>文本下划线</h3>
      <underline type="text" placement='middle-to-both'>
        <template>
          <p class="desc">left-to-right</p>
        </template>
      </underline>
      <underline type="text" placement='left-to-right'>
        <template>
          <p class="desc">left-to-right</p>
        </template>
      </underline>
      <underline type="text" placement='right-to-left'>
        <template>
          <p class="desc">right-to-left</p>
        </template>
      </underline>
    </div>
  </div>
</template>

<script>
import underline from "@/components/underlineEffect/underline-effect";

export default {
  name: 'underlineEffect',
  components: { underline }
}
</script>

<style lang="scss" scoped>
.underline-effect {
  padding: 20px;
}

input {
  border: none;
  outline: none;
}

::v-deep .item {
  margin-right: 10px;
}

.desc {
  margin: 0px 0px;
}
</style>