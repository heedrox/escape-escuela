<template>
  <div class="welcome-screen box">
    <div class="container">
      <div class="close" @click="$emit('start')">
        X
      </div>
      <scrolling-text>
        <slot></slot>
      </scrolling-text>
    </div>
  </div>
</template>
<style scoped lang="scss">
    .welcome-screen {
        background-image: url('../../assets/common/screen-background.jpg');
        background-repeat: repeat;
        width: 60vw;
        height: 70vh;
        margin: auto;
        top: 10vh;
        position: relative;
        color: $text-story-color;
    }

    .welcome-screen .container {
        padding: 3vh;
        margin: auto;
    }

    .close {
      position: fixed;
      font-family: "Arial Black", serif;
      top:7.5vh;
      left: 78.5vw;
      height: 5vh;
      width: 3vw;
      background-color: $box-color;
      color: $close-box-color;
      border-radius: 50%;
      display: inline-block;
      font-size:3vh;
      padding-top:1.5vh;
      z-index:2;
    }
</style>
<script>
import ScrollingText from './ScrollingText';

export default {
  name: 'WelcomeScroll',
  components: {
    ScrollingText,
  },
  emits: ['start'],
}
</script>
