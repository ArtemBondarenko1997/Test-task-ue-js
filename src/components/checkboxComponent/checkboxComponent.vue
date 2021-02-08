<template>
  <div @click="active=!active">
    <div
        class="checkBoxWrap"
        :class="{active}"
        :style="`width: ${size}px; height: ${size}px; background-color: ${bgColor};`"
    >
      <div class="activatin" :style="`background-color: ${color}`"></div>
      <div class="inner" :style="`background-color: ${innerColor}`"></div>
    </div>
  </div>
</template>

<script>
export default {
name: "checkboxComponent",

  props: {
    value: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 16
    },
    bgColor: {
      type: String,
      default: "#222425"
    },
    color:{
      type: String,
      default: "#6C8CD5"
    },
    innerColor: {
      type: String,
      default: "#36393F"
    }
  },

  computed: {
    active: {
      get(){
        return this.value;
      },
      set(val){
        this.$emit("change", val);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.checkBoxWrap{
  display: inline-block;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.5);
  border-radius: 100%;
  position: relative;
  cursor: pointer;
  margin: 4px;
  z-index: 6;
  & .inner{
    position: absolute;
    transform: translateY(50%);
    left: 25%;
    width: 50%;
    height: 50%;
    border-radius: 100%;
  }
  & .activatin{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    opacity: 0;
    transition: opacity .5s;
  }
  &.active .activatin{
    opacity: 1;
  }
}
</style>