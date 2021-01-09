<template>
  <div>
    <div class="zoomed-item box" @click.stop="">
      <span class="helper"></span>
      <img id="fieldImage" alt="campo juego" :src="getUrl()" @load="recalculateClientRect()" />
    </div>
    <div class="hole" :style="{
      left: holeLeft, top: holeTop,
      borderLeft: borderLeft, borderTop: borderTop, borderRight: borderRight, borderBottom: borderBottom}"
    >
      <img class="dron" :src="getDronImage()" width="40px" height="auto" alt="dron" />
    </div>
    <div v-if="dronCellPosition.top > 0" class="arrow arrow-up"
         :style="{ left: arrowUpPos.left, top: arrowUpPos.top }"
         @click="moveDron(0,-1)"
    />
    <div v-if="dronCellPosition.left < 7" class="arrow arrow-right"
         :style="{ left: arrowRightPos.left, top: arrowRightPos.top }"
         @click="moveDron(1, 0)"
    />
    <div v-if="dronCellPosition.left > 0" class="arrow arrow-left"
         :style="{ left: arrowLeftPos.left, top: arrowLeftPos.top }"
         @click="moveDron(-1, 0)"
    />
    <div v-if="dronCellPosition.top < 3 " class="arrow arrow-bottom"
         :style="{ left: arrowBottomPos.left, top: arrowBottomPos.top }"
         @click="moveDron(0,1)"
    />
  </div>
</template>
<style scoped type="scss">
.zoomed-item {
  position: fixed;
  top: 10vh;
  left: 10vw;
  height: 80vh;
  width: 80vw;
  background: black;
  white-space: nowrap; /* This is required unless you put the helper span closely near the img */
  text-align: center;
  border-color: $primary-color;
  border-width: 2vh;
}

.zoomed-item img {
  max-height: 80vh;
  max-width: 80vw;
  width: auto;
  vertical-align: middle;
}

.helper {
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.hole {
  position: fixed;
  height: 125px;
  width: 125px;
}

.dron {
  animation: dronimation 5s both alternate infinite;
}

.arrow {
  position: fixed;
  background-image: url('../../../../../public/game/5/arrow-right.png');
  width: 125px;
  height: 125px;
  cursor: pointer;
  animation: blink 1.33s ease-out infinite;
}
.arrow:hover {
  animation: none;
  filter: drop-shadow(0 0 0.75rem rgba(255,255,255,0.35))
}
.arrow-up {
  transform:rotate(-90deg);
}
.arrow-right {
  transform:rotate(0deg);
}
.arrow-bottom {
  transform:rotate(90deg);
}
.arrow-left {
  transform:rotate(180deg);
}
@keyframes dronimation {
  5%, 45% {
    padding-left: 5px;
  }

  10%, 40% {
    padding-right: 5px;
    padding-bottom: 5px;
  }

  15%, 25%, 35% {
    padding-left: 2px;
    padding-top: 2px;
  }

  20%, 30% {
    padding-right: 0px;
  }
  50% {
    padding: 0px;
  }
  60%, 70% {
    padding-right: 4px;
    padding-bottom: 2px;
  }

  75%, 85%, 95% {
    padding-left: 3px;
    padding-top: 3px;
  }
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  20% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
}

</style>
<script>
export default {
  name: 'DronCameraGame',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      fieldImageClientRect: null,
      dronCellPosition: {
        top: 0,
        left: 0,
      }
    };
  },
  computed: {
    holeLeft() {
      return this.fieldImageClientRect ? this.fieldImageClientRect.left + 'px' : '0px';
    },
    holeTop() {
      return this.fieldImageClientRect ? this.fieldImageClientRect.top + 'px' : '0px';
    },
    borderLeft() {
      return this.dronCellPosition.left * 127 + 'px solid black';
    },
    borderRight() {
      return (8-this.dronCellPosition.left) * 127 + 'px solid black';
    },
    borderTop() {
      return (this.dronCellPosition.top) * 127 + 'px solid black';
    },
    borderBottom() {
      return (4-this.dronCellPosition.top) * 127 + 'px solid black';
    },
    holePosition() {
      return {
        left: this.fieldImageClientRect ? this.fieldImageClientRect.left + this.dronCellPosition.left * 127 : 0,
        top: this.fieldImageClientRect ? this.fieldImageClientRect.top + this.dronCellPosition.top * 127 : 0,
      }
    },
    arrowRightPos() {
      return {
        left: (127 + this.holePosition.left) + 'px',
        top: this.holePosition.top + 'px',
      }
    },
    arrowUpPos() {
      return {
        left: (this.holePosition.left) + 'px',
        top: -127 + this.holePosition.top + 'px',
      }
    },
    arrowLeftPos() {
      return {
        left: (- 127 + this.holePosition.left) + 'px',
        top: this.holePosition.top + 'px',
      }
    },
    arrowBottomPos() {
      return {
        left: (this.holePosition.left) + 'px',
        top: 127 + this.holePosition.top + 'px',
      }
    },
  },
  created() {
  window.addEventListener("resize", this.recalculateClientRect);
  },
  destroyed() {
  window.removeEventListener("resize", this.recalculateClientRect);
  },
  methods: {
    getDronImage() {
      return `${this.publicPath}game/5/dron-small.png`
    },
    getUrl() {
      return `${this.publicPath}game/5/room5-numeros.jpg`
    },
    recalculateClientRect() {
      this.fieldImageClientRect = document.getElementById('fieldImage') ?
          document.getElementById('fieldImage').getBoundingClientRect() : null;
    },
    moveDron(leftDiff, topDiff) {
      this.dronCellPosition.left = this.dronCellPosition.left + leftDiff;
      this.dronCellPosition.top = this.dronCellPosition.top + topDiff;
      this.checkDronColission();
    },
    checkDronColission() {

    }
  },
};
</script>
