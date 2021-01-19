<template>
  <div class="movingWizardSpellResult box">
    <img class="active-spell-result" :src="whiteSpellUrl" alt="the white spell" />
    <div class="players-spells">
      <img class="box spell" :src="player1Image" alt="spell 1">
      <img class="box spell" :src="player2Image" alt="spell 2">
      <img v-if="player3Image !== ''" class="box spell" :src="player3Image" alt="spell 3">
    </div>
    <div v-if="isAdmin()" class="spell-actions">
      <button @click="$emit('result-ok')">
        BIEN :)
      </button>
      <button @click="$emit('result-ko')">
        MAL :(
      </button>
    </div>
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

.active-spell-result {
  max-height: 25vh;
  margin-top: 5vh;
}

.spell {
  max-width: 20vw;
  margin: 2vw;
  max-height: 30vh;
}

.spell-actions button {
  font-size: 3vh;
  margin: 2vh;
}

</style>
<script>
import { isAdmin } from '@/lib/is-admin';

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
  },
  emits: ['result-ok', 'result-ko'],
  data() {
    return {
      publicPath: process.env.BASE_URL,
    }
  },
  computed: {
    whiteSpellUrl() {
      return `${this.publicPath}game/moving-wizard/white-spell-riddikulus.png`;
    }
  },
  mounted() {
    this.sendSelectedEvent();
  },
  destroyed() {
    this.sendUnselectedEvent();
  },
  methods: {
    sendSelectedEvent() {
      const event = new CustomEvent('selected-item');
      window.document.dispatchEvent(event);
    },
    sendUnselectedEvent() {
      const event = new CustomEvent('unselected-item');
      window.document.dispatchEvent(event);
    },
    isAdmin() {
      return isAdmin();
    }
  }
}
</script>
