<template>
  <div>
    <img id="theWizard" :src="wizardUrl()" alt="the wizard" :style="wizardStyle" @click="clickWizard">
    <div v-if="isAdmin()" class="adminControlSpell">
      <button @click="adminThrowSpell">
        LANZAR HECHIZO
      </button>
      {{ player0strokes }} -
      {{ player1strokes }} -
      {{ player2strokes }} -
    </div>
    <div v-if="gameState.activeSpell" class="activeSpell">
      <img :src="activeSpellUrl" alt="the-spell" class="activeSpell" :style="spellStyle" @click="clickWizard" />
    </div>
  </div>
</template>
<style lang="scss" scoped="true">
#theWizard {
  position: fixed;
  top: 40vh;
  left: 44vw;
  z-index:1000;
  max-height: 30vh;
  width: auto;
  transform-origin: center;
  animation: pulse 2s infinite;
}

.activeSpell {
  position: fixed;
  z-index: 1001;
  transform-origin: center;
  max-height: 20vh;
  animation: spell 1s infinite alternate, fadein 1s ease-in;
}
.adminControlSpell {
  position: fixed;
  top: 0vh;
  left: 0vw;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
  }

  70% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.95);
  }
}

@keyframes spell {
  from {
    filter: drop-shadow(0 0 0px #000000);
  }
  to {
    filter: drop-shadow(0 0 20px #5d0303);
  }
}

@keyframes fadein {
  from { opacity: 0; }
  to   { opacity: 1; }
}
</style>
<script>
import { isAdmin } from '@/lib/is-admin';
import firebaseUtil from '@/lib/firebase-util';
import { getNumberPlayers } from '@/lib/get-number-players';

//start by 1
const SPELLS_BY_WIZARD = {
  'when2players': ['', '1a', '2b', '1e', '2d', '2e', '1d', '1c', '2a', '1b', '2c'],
  'when3players': ['', '1a', '2b', '3c', '1e', '2d', '3a', '2e', '3d', '1d', '3b', '1c', '2a', '1b', '3e', '2c'],
};

export default {
  name: 'MovingWizard',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      timerInterval: null,
      wizardPosition: {
        top: 40,
        left: 44,
      },
      direction: {
        horizontal: 1,
        vertical: 1,
      },
      gameState: {
        activeSpell: 0, //indexed by 1, 0 = no active
        spellplayer0: [], spellplayer1: [], spellplayer2: [] },
    }
  },
  firestore: {
    gameState: firebaseUtil.doc('/')
  },
  computed: {
    activeSpellUrl() {
      const spellRounds = SPELLS_BY_WIZARD[`when${getNumberPlayers()}players`];
      return `${this.publicPath}game/moving-wizard/black-spell-${spellRounds[this.gameState.activeSpell]}.png`;
    },
    wizardStyle() {
      return {
        top: this.wizardPosition.top + 'vh',
        left: this.wizardPosition.left + 'vw',
      };
    },
    spellStyle() {
      return {
        top: (this.wizardPosition.top + 2) + 'vh',
        left: (this.wizardPosition.left + 1) + 'vw',
      };
    },
    player0strokes() {
      return this.gameState.spellplayer0 ? this.gameState.spellplayer0.length : 0 ;
    },
    player1strokes() {
      return this.gameState.spellplayer1 ? this.gameState.spellplayer1.length : 0 ;
    },
    player2strokes() {
      return this.gameState.spellplayer2 ? this.gameState.spellplayer2.length : 0 ;
    },
  },
  mounted() {
    this.timerInterval = setInterval(() => {
      this.moveWizard();
    }, 10);
  },
  destroyed() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  },
  methods: {
    isAdmin() {
      return isAdmin();
    },
    wizardUrl() {
      return this.publicPath + 'game/moving-wizard/wizard.png';
    },
    moveWizard() {
      if (Math.random() < 0.5) {
        this.moveVertically();
      } else {
        this.moveHorizontally();
      }
    },
    moveVertically() {
      if (this.wizardPosition.top < 2) {
        this.direction.vertical = 1;
      } else if (this.wizardPosition.top > 70) {
        this.direction.vertical = -1;
      } else if (Math.random() < 0.05) {
        this.direction.vertical = this.direction.vertical * -1; // to add some randomness to movements
      }
      this.wizardPosition.top = this.wizardPosition.top + (this.direction.vertical * Math.random() / 5);
    },
    moveHorizontally() {
      if (this.wizardPosition.left < 2) {
        this.direction.horizontal = 1;
      } else if (this.wizardPosition.left > 70) {
        this.direction.horizontal = -1;
      } else if (Math.random() < 0.05) {
        this.direction.horizontal = this.direction.horizontal * -1; // to add some randomness to movements
      }
      this.wizardPosition.left = this.wizardPosition.left + (this.direction.horizontal * Math.random() / 5);
    },
    clickWizard() {
      this.wizardPosition.top = Math.random() * 70;
      this.wizardPosition.left = Math.random() * 80;
    },
    adminThrowSpell() {
      const activeSpell = this.calculateNextSpell();
      this.$firestoreRefs.gameState.update( { activeSpell });
    },
    calculateNextSpell() {
      if (!this.gameState.activeSpell) return 1;
      const nextSpell = this.gameState.activeSpell + 1;
      return (nextSpell >= SPELLS_BY_WIZARD[`when${getNumberPlayers()}players`].length) ? 1 : nextSpell;
    }
  }
}
</script>
