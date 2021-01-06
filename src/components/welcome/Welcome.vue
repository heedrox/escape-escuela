<template>
  <div class="welcome">
    <welcome-title v-if="state === 'SHOW_WELCOME'" @start="showScroll()"></welcome-title>
    <welcome-scroll v-if="state === 'SHOW_SCROLL'" @start="doStart()">
      Iñigo & amigos,<br /><br />
      Estoy atrapado.<br /><br />
      Cuando fui a recoger a Iñigo al colegio, alguien me pilló husmeando.<br /><br />
      Algo debí encontrar porque me han encerrado. <br /><br />
      Ayudadme a salir y veamos qué misterios esconde este colegio.
    </welcome-scroll>
  </div>
</template>

<script>
import WelcomeTitle from './WelcomeTitle';
import WelcomeScroll from './WelcomeScroll';

const STATES = {
  SHOW_WELCOME: 'SHOW_WELCOME',
  SHOW_SCROLL: 'SHOW_SCROLL',
};

export default {
  name: 'Welcome',
  components: {
    WelcomeTitle,
    WelcomeScroll
  },
  emits: ['start'],
  data() {
    return {
      state: STATES.SHOW_WELCOME,
    }
  },
  mounted() {
  },
  methods: {
    showScroll() {
      this.state = STATES.SHOW_SCROLL;
    },
    doStart() {
      this.$emit('start');
    }
  }
}
</script>

<style scoped>
</style>
