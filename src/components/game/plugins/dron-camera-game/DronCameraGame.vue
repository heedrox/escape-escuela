<template>
  <div>
    <div class="zoomed-item box" @click.stop="">
      <span class="helper"></span>
      <img v-if="dronCellPosition" id="fieldImage" alt="campo juego" :src="getUrl()" @load="recalculateClientRect()" />
    </div>

    <div class="hole" :style="{
      width: holeWidth + 'px', height: holeHeight + 'px',
      left: holeLeft, top: holeTop,
      borderLeft: borderLeft, borderTop: borderTop, borderRight: borderRight, borderBottom: borderBottom}"
    >
      <img class="dron" :src="getDronImage()" width="40px" height="auto" alt="dron"
           :style="{ width: holeWidth / 3 + 'px', height: holeHeight / 3 + 'px'}"
      />
    </div>
    <div v-if="canIMove('up') && dronCellPosition && (dronCellPosition.top > 0) && canMoveTo(0, -1)"
         class="arrow arrow-up"
         :style="{ left: arrowUpPos.left, top: arrowUpPos.top,
                   width: holeWidth + 'px', height: holeHeight + 'px', }"
         @click="moveDron(0,-1)"
    />
    <div v-if="canIMove('right') && dronCellPosition && (dronCellPosition.left < 7) && canMoveTo(1, 0)"
         class="arrow arrow-right"
         :style="{ left: arrowRightPos.left, top: arrowRightPos.top,
                   width: holeWidth + 'px', height: holeHeight + 'px', }"
         @click="moveDron(1, 0)"
    />
    <div v-if="canIMove('left') && dronCellPosition && (dronCellPosition.left > 0) && canMoveTo(-1, 0)"
         class="arrow arrow-left"
         :style="{ left: arrowLeftPos.left, top: arrowLeftPos.top,
                   width: holeWidth + 'px', height: holeHeight + 'px', }"
         @click="moveDron(-1, 0)"
    />
    <div v-if="canIMove('bottom') && dronCellPosition && (dronCellPosition.top < 3) && canMoveTo(0, 1)"
         class="arrow arrow-bottom"
         :style="{ left: arrowBottomPos.left, top: arrowBottomPos.top,
                   width: holeWidth + 'px', height: holeHeight + 'px', }"
         @click="moveDron(0,1)"
    />
  </div>
</template>
<style scoped lang="scss">
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
  background-size: cover;
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
import firebaseUtil from '@/lib/firebase-util';
import { isAdmin } from '@/lib/is-admin';
import { getNumberPlayers } from '@/lib/get-number-players';
import { getPlayerNumber } from '@/lib/get-player-number';

const aCell = (x,y) => ({x, y});
const COLISSION_CELLS = [
    aCell(2, 0),
  aCell(4, 0),
  aCell(6, 0),
  aCell(2, 1),
  aCell(1, 3),
  aCell(3, 3),
  aCell(5, 3),
  aCell(7, 3),
];
const byCell = (x,y) => n => n.x === x && n.y === y;

const BLANK_DRON_CELL_POSITION = {
  top: 0,
  left: 0,
};

const WHO_CAN_MOVE = {
  'when2players' : {
    'up': [1],
    'left': [1],
    'right': [2],
    'bottom': [2],
  },
  'when3players' : {
    'up': [1],
    'left': [2],
    'right': [3],
    'bottom': [1,2,3],
  }
}
export default {
  name: 'DronCameraGame',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      fieldImageClientRect: null,
      dronCellPosition: { },
    };
  },
  firestore: {
    dronCellPosition: firebaseUtil.doc('/dron-camera-game/position')
  },
  computed: {
    holeWidth() {
      return this.fieldImageClientRect ? Math.round(this.fieldImageClientRect.width / 8): 0;
    },
    holeHeight() {
      return this.fieldImageClientRect ? Math.round(this.fieldImageClientRect.height / 4): 0;
    },
    holeLeft() {
      return this.fieldImageClientRect ? this.fieldImageClientRect.left + 'px' : '0px';
    },
    holeTop() {
      return this.fieldImageClientRect ? this.fieldImageClientRect.top + 'px' : '0px';
    },
    borderLeft() {
      return this.dronCellPosition ? this.dronCellPosition.left * this.holeWidth + 'px solid black' : '0px';
    },
    borderRight() {
      return this.dronCellPosition ? (8-this.dronCellPosition.left) * this.holeWidth + 'px solid black' : '0px';
    },
    borderTop() {
      return this.dronCellPosition ? (this.dronCellPosition.top) * this.holeHeight + 'px solid black' : '0px';
    },
    borderBottom() {
      console.log(this.dronCellPosition);
      return this.dronCellPosition ? (4-this.dronCellPosition.top) * this.holeHeight + 'px solid black' : '0px';
    },
    holePosition() {
      return {
        left: this.dronCellPosition && this.fieldImageClientRect ?
            this.fieldImageClientRect.left + this.dronCellPosition.left * this.holeWidth : 0,
        top: this.dronCellPosition && this.fieldImageClientRect ?
            this.fieldImageClientRect.top + this.dronCellPosition.top * this.holeHeight : 0,
      }
    },
    arrowRightPos() {
      return {
        left: (this.holeWidth + this.holePosition.left) + 'px',
        top: this.holePosition.top + 'px',
      }
    },
    arrowUpPos() {
      return {
        left: (this.holePosition.left) + 'px',
        top: -this.holeHeight + this.holePosition.top + 'px',
      }
    },
    arrowLeftPos() {
      return {
        left: (-this.holeWidth + this.holePosition.left) + 'px',
        top: this.holePosition.top + 'px',
      }
    },
    arrowBottomPos() {
      return {
        left: (this.holePosition.left) + 'px',
        top: this.holeHeight + this.holePosition.top + 'px',
      }
    },
  },
  watch: {
    dronCellPosition() {
      if (isAdmin() && this.dronCellPosition === null) {
        this.$firestoreRefs.dronCellPosition.set(BLANK_DRON_CELL_POSITION);
      }
    }
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
    getDronVentiladorImage() {
      return `${this.publicPath}game/5/dron-ventilador.png`
    },
    getUrl() {
      return `${this.publicPath}game/5/room5-numeros.jpg`
    },
    recalculateClientRect() {
      this.fieldImageClientRect = document.getElementById('fieldImage') ?
          document.getElementById('fieldImage').getBoundingClientRect() : null;
    },
    moveDron(leftDiff, topDiff) {
      const left = this.dronCellPosition.left + leftDiff;
      const top = this.dronCellPosition.top + topDiff;
      this.$firestoreRefs.dronCellPosition.set({ top, left});
    },
    canMoveTo(x, y) {
      if (!this.dronCellPosition) {
        return false;
      }
      return COLISSION_CELLS
          .filter(byCell(this.dronCellPosition.left + x, this.dronCellPosition.top + y))
          .length === 0;
    },
    canIMove(where) {
      if (isAdmin()) return true;
      const allowedPlayers = WHO_CAN_MOVE[`when${getNumberPlayers()}players`][where];
      return allowedPlayers.indexOf(getPlayerNumber()) >= 0;
    },
  },
};
</script>
