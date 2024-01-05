<template>
  <div class="underline-component">
    <!-- 文本区 -->
    <div class="text-area" v-if="type === 'text'">
      <div class="item middle-to-both" :style="{ '--color': color }" v-if="placement === 'middle-to-both'">
        <slot>
          <a href="#">从中间到两端</a>
        </slot>
      </div>

      <div class="item left-to-right" :style="{ '--color': color }" v-if="placement === 'left-to-right'">
        <slot>
          <a href="#">从左向右</a>
        </slot>
      </div>

      <div class="item right-to-left" :style="{ '--color': color }" v-if="placement === 'right-to-left'">
        <slot>
          <a href="#">从右向左</a>
        </slot>
      </div>
    </div>


    <!-- 表单区 -->
    <div class="input-area" v-if="type === 'input'">
      <slot name="under-line">
        <label for="input" :style="{ '--color': color }">名称</label>
        <input :type="inputType" :style="{ '--color': color }" id="input" placeholder="请输入...">
        <span class="line middle-to-both" :style="{ '--color': color }" v-if="placement === 'middle-to-both'"></span>
        <span class="line left-to-right" :style="{ '--color': color }" v-if="placement === 'left-to-right'"></span>
        <span class="line right-to-left" :style="{ '--color': color }" v-if="placement === 'right-to-left'"></span>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'underlineEffect',
  props: {
    type: {
      type: String,
      default: "text"
    },
    inputType: {
      type: String,
      default: "text"
    },
    placement: {
      type: String,
      default: "middle-to-both"
    },
    color: {
      type: String,
      default: "#3a8ee6"
    },
  }
}
</script>

<style lang="scss" scoped>
.underline-component {
  display: inline-block;
}

.item {
  position: relative;
  display: inline-block;
  margin: 0px auto 5px;
  transition: .3s ease-in-out;

  &:hover {
    color: var(--color);
  }
}

.text-area {
  .middle-to-both::after {
    content: '';
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: -5px;
    left: 0;
    background-color: var(--color);
    transform: scaleX(0);
    transition: .3s ease-in-out;
    visibility: hidden;
  }

  .middle-to-both:hover::after {
    transform: scaleX(1);
    visibility: visible;
  }

  .left-to-right::after {
    content: '';
    width: 0%;
    height: 2px;
    position: absolute;
    bottom: -5px;
    left: 0;
    background-color: var(--color);
    transition: .3s ease-in-out;
    visibility: hidden;
  }

  .left-to-right:hover:after {
    width: 100%;
    visibility: visible;
  }

  .right-to-left::after {
    content: '';
    width: 0%;
    height: 2px;
    position: absolute;
    bottom: -5px;
    right: 0;
    background-color: var(--color);
    transition: .3s ease-in-out;
    visibility: hidden;
  }

  .right-to-left:hover::after {
    width: 100%;
    visibility: visible;
  }
}

.input-area {
  label {
    font-size: 14px;
    display: inline-block;
    transition: .3s ease-in-out;
    margin-right: 5px;
    color: #666;
  }

  input {
    border: none;
    outline: none;
    padding: 5px 5px 5px 5px;
    line-height: 1;
    transition: .3s ease-in-out;
    color: #666;
    font-size: 14px;

    &:hover~.middle-to-both::after,
    &:focus~.middle-to-both::after {
      transform: scaleX(1);
      visibility: visible;
    }

    &:hover~.left-to-right::after,
    &:focus~.left-to-right::after {
      width: 100%;
      visibility: visible;
    }

    &:hover~.right-to-left::after,
    &:focus~.right-to-left::after {
      width: 100%;
      visibility: visible;
    }
  }

  .line {
    position: relative;
    display: block;
    height: 2px;
    background-color: #e4e4e4;

    &.middle-to-both::after {
      content: '';
      width: 100%;
      height: 2px;
      position: absolute;
      bottom: 0px;
      left: 0;
      background-color: var(--color);
      transform: scaleX(0);
      transition: .3s ease-in-out;
      visibility: hidden;
    }

    &.left-to-right::after {
      content: '';
      width: 0%;
      height: 2px;
      position: absolute;
      bottom: 0px;
      left: 0;
      background-color: var(--color);
      transition: .3s ease-in-out;
      visibility: hidden;
    }

    &.right-to-left::after {
      content: '';
      width: 0%;
      height: 2px;
      position: absolute;
      bottom: 0px;
      right: 0;
      background-color: var(--color);
      transition: .3s ease-in-out;
      visibility: hidden;
    }
  }
}
</style>