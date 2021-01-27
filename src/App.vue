<template>
  <div id="app">
    <div v-if="state === 'INIT'">
      Iniciando...
    </div>
    <Welcome v-if="state === 'WELCOME'" @start="createCode(); closeWelcome()" />
    <Videoconference v-if="shouldEmbedVideoconference()"
                     :is-existent="state === 'VIDEO' || state === 'GAME'"
                     :is-visible="state === 'VIDEO'"
                     @start="startGame()"
                     @show-video="showVideo()"
    />
    <Game v-if="state === 'GAME'"></Game>
  </div>
</template>

<script>
import Welcome from './components/welcome/Welcome.vue'
import Game from './components/game/Game';
import Videoconference from './components/videoconference/Videoconference';
import gameConfigFactory from '@/lib/game-config-factory';
import './assets/common/normalize.css'
import './assets/common/common.scss'
import firebaseUtil from '@/lib/firebase-util';

const gameConfig = gameConfigFactory.get();

const STATES = {
  INIT: 'INIT',
  WELCOME: 'WELCOME',
  GAME: 'GAME',
  VIDEO: 'VIDEO',
};

const BLANK_FIREBASE_GAME = {
  ready: true,
  unlockedItems: gameConfig.defaultUnlockedItems,
  unlockedRooms: gameConfig.defaultUnlockedRooms,
};

const loggedPromise = firebaseUtil.login();

export default {
  name: 'App',
  components: {
    Welcome,
    Game,
    Videoconference
  },
  data() {
    return {
      state: STATES.INIT,
      gameState: null,
      loggedPromise: null,
    }
  },
  async mounted() {
    try {
      await loggedPromise;
    } catch (error) {
      alert('Hubo un problema accediendo a internet. Por favor, actualiza la página. Si el mensaje se repite, ' +
          'cuéntaselo a Jordi');
    }
    this.state = STATES.WELCOME;
    this.$bind('gameState', firebaseUtil.doc('/'));
  },
  methods: {
    createCode() {
      if (!this.gameState) {
        this.$firestoreRefs.gameState.set(BLANK_FIREBASE_GAME);
      }
    },
    closeWelcome() {
      this.state = this.shouldEmbedVideoconference() ? STATES.VIDEO : STATES.GAME;
    },
    startGame() {
      this.state = STATES.GAME;
    },
    showVideo() {
      this.state = STATES.VIDEO;
    },
    shouldEmbedVideoconference() {
      return gameConfig.embedVideoconference
    }
  },
}
</script>

<style lang="scss">

@font-face {
  font-family: 'PrimaryFontFamily';
  src: url(#{$font-primary-path}) format('truetype');
}

@font-face {
  font-family: 'SecondaryFontFamily';
  src: url(#{$font-secondary-path}) format('truetype');
}

@font-face {
  font-family: 'Digital7';
  src: url('./assets/common/digital-7.ttf') format('truetype')
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  background-image: url('./assets/common/background.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
