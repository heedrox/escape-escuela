<template>
  <div v-if="isAdmin()">
    <select v-model="selectedPlugin">
      <option selected></option>
      <option v-for="(plugin,idx) in plugins" :key="`plugin-${idx}`" :value="plugin">
        {{ plugin.name }}
      </option>
    </select>
    <button @click="showPlugin()">
      SHOW PLUGIN
    </button>
    <button @click="hidePlugin()">
      HIDE PLUGIN
    </button>
    &nbsp;
    <select v-model="selectedAudio">
      <option selected></option>
      <option v-for="audio in audios" :key="audio.image" :value="audio">
        {{ audio.image }}
      </option>
    </select>
    <button @click="sendAudio()">
      Send audio
    </button>
  </div>
</template>
<style scoped>

</style>
<script type="javascript">
import { glitchAction } from './glitch';
import { audioAction } from './audio';
import firebaseUtil from '../../../lib/firebase-util';
import { isAdmin } from '@/lib/is-admin';
import gameConfig from '../../../config/game-config';
import gameActions from '../../../lib/game-actions-lib';

export default {
  name: 'GameActions',
  emits: [ 'show-plugin', 'hide-plugin' ],
  data() {
    return {
      gameState: {},
      selectedAudio: '',
      selectedPlugin: '',
      publicPath: process.env.BASE_URL,
    };
  },
  firestore: {
    gameState: firebaseUtil.doc('/')
  },
  computed: {
    audios() {
      return gameConfig.items.filter(gc => gc.type === 'MP3');
    },
    plugins() {
      return gameConfig.fullScreenPlugins;
    }
  },
  watch: {
    gameState() {
      if (!this.gameState.action) return;
      console.log('ACTION RECEIVED', this.gameState.action);

      if (this.gameState.action.id === 'SHOWPLUGIN') {
        this.$emit('show-plugin', { name: this.gameState.action.argId });
      } else if (this.gameState.action.id === 'HIDEPLUGIN') {
        this.$emit('hide-plugin', { name: this.gameState.action.argId });
      } else if (isAdmin()) {
        console.log('ignoring as Im admin');
      } else  if ((this.gameState.action.id === 'GLITCH')) {
        glitchAction();
      } else if ((this.gameState.action.id === 'AUDIO')) {
        audioAction(this.publicPath, this.gameState.action.argId);
      }
    }
  },
  methods: {
    showPlugin() {
      if (window.confirm('Mostramos el plugin, ¿qué tal está yendo?')) {
        gameActions.send(this.$firestoreRefs.gameState, { id: 'SHOWPLUGIN', argId: this.selectedPlugin.name })
      }
    },
    hidePlugin() {
      if (window.confirm('Ocultamos el plugin')) {
        gameActions.send(this.$firestoreRefs.gameState, { id: 'HIDEPLUGIN', argId: this.selectedPlugin.name })
      }
    },
    doGlitch() {
      gameActions.send(this.$firestoreRefs.gameState, { id: 'GLITCH'})
    },
    sendAudio() {
      console.log(this.selectedAudio);
      this.$firestoreRefs.gameState.update( { action: { id: 'AUDIO', argId: this.selectedAudio.id } });
      setTimeout(() => {
        this.$firestoreRefs.gameState.update( { action: null });
      }, 1000);
    },
    isAdmin() {
      return isAdmin();
    }
  },
}
</script>
