<template>
  <div>
    <img id="theWizard" :src="wizardUrl()" alt="the wizard" :style="wizardStyle" @click="clickWizard">
    <div v-if="activeSpell && showSpell" class="activeSpell">
      <img :src="activeSpellUrl" alt="the-spell" class="activeSpell" :style="spellStyle" @click="clickWizard" />
    </div>
  </div>
</template>
<style lang="scss">
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
import { getNumberPlayers } from '@/lib/get-number-players';
import { SPELLS_BY_WIZARD } from '@/components/game/plugins/moving-wizard/spells-by-wizard';

export default {
  name: 'MovingWizardImage',
  props: {
    activeSpell: {
      type: Number,
      default: 0,
    },
    wizardHealth: {
      type: Number,
      default: 100,
    },
    showSpell: {
      type: Boolean,
      default: false,
    }
  },
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
      }
    };
  },
  computed: {
    activeSpellUrl() {
      const spellRounds = SPELLS_BY_WIZARD[`when${getNumberPlayers()}players`];
      return `${this.publicPath}game/moving-wizard/black-spell-${spellRounds[this.activeSpell]}.png`;
    },
    wizardStyle() {
      return {
        top: this.wizardPosition.top + 'vh',
        left: this.wizardPosition.left + 'vw',
        maxHeight: 30 * this.wizardHealth / 100 + 'vh',
      };
    },
    spellStyle() {
      return {
        top: (this.wizardPosition.top + 2) + 'vh',
        left: (this.wizardPosition.left + 1) + 'vw',
      };
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
  },
}
</script>
