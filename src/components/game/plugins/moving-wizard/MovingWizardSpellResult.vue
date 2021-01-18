<template>
  <div class="movingWizardSpellResult box">
    {{ activeSpell }}
    <img :src="player1Image">
  </div>
</template>
<style scoped lang="scss">
.movingWizardSpellResult {
 position: fixed;
 top: 10vh;
 left: 10vw;
 height:80vh;
 width:80vw;
 background:black;
 white-space: nowrap; /* This is required unless you put the helper span closely near the img */
 text-align: center;
 border-color: $primary-color;
 border-width: 2vh;
}
</style>
<script>
export default {
  name: 'MovingWizardSpellResult',
  props: {
    activeSpell: {
      type: Number,
      default: 0,
    },
    player1Image: {
      type: String,
      default: '',
    },
    player2Image: {
      type: String,
      default: '',
    },
    player3Image: {
      type: String,
      default: '',
    }
  }
}
</script>
