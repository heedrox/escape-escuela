<template>
  <div>
    <p>ESCAPE DE</p>
    <h1>LA ESCUELA</h1>
    <a class="start" href="#" @click="$emit('start')">Empezar</a>
  </div>
</template>
<style scoped lang="scss">


  p {
    padding-top: 10vh;
    font-size: 5em;
    color: $primary-color;
    font-family:'PrimaryFontFamily', Arial, Helvetica,serif;
    text-shadow: 2px 2px white, -2px -2px white;
  }

  h1 {
    padding-top: 2vh;
    font-size: 8em;
    color: $primary-color;
    font-family:'PrimaryFontFamily', Arial, Helvetica,serif;
    text-shadow: 2px 2px white, -2px -2px white;
  }

  a.start {
    font-family:'SecondaryFontFamily', Arial, Helvetica,serif;
    display: block;
    font-size: 4em;
    color: $secondary-color;
    text-decoration: underline;
    position: absolute;
    bottom: 5vh;
    text-align: center;
    width:100%;
    text-shadow: 2px 2px white, -2px -2px white;
  }
</style>
<script>
export default {
  name: 'WelcomeTitle',
  emits: ['start'],
}
</script>
