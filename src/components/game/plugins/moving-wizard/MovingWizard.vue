<template>
  <div>
    <img id="theWizard" :src="wizardUrl()" alt="the wizard" :style="wizardStyle" @click="clickWizard">
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
  animation: pulse 2s infinite;
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
</style>
<script>
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
      }
    }
  },
  computed: {
    wizardStyle() {
      return {
        top: this.wizardPosition.top + 'vh',
        left: this.wizardPosition.left + 'vw',
      };
    }
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
      this.wizardPosition.top = Math.random() * 0.5 * 70;
      this.wizardPosition.left = 50 + Math.random() * 0.5 * 50;
    },
  }
}
</script>
