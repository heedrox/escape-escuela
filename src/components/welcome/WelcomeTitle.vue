<template>
  <div>
    <p>ESCAPE DE</p>
    <h1>GAZTELUETA</h1>
    <a class="start" href="#" @click="$emit('start')">Empezar</a>
  </div>
</template>
<style scoped lang="scss">


  p {
    padding-top: 10vh;
    font-size: 5em;
    color: $primary-color;
    font-family:'Title1Family', Arial, Helvetica,serif;
  }

  h1 {
    padding-top: 2vh;
    font-size: 8em;
    color: $primary-color;
    font-family:'Title1Family', Arial, Helvetica,serif;
  }

  a.start {
    font-family:'Title1Family', Arial, Helvetica,serif;
    display: block;
    font-size: 4em;
    color: #8efc80;
    text-decoration: underline;
    position: absolute;
    bottom: 5vh;
    text-align: center;
    width:100%;
  }
</style>
<script>
export default {
  name: 'WelcomeTitle',
  emits: ['start'],
}
</script>
