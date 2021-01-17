<template>
  <div v-show="!hidden" class="box theWhiteboard">
    <canvas id="whiteboardCanvas"></canvas>
  </div>
</template>
<style>
.theWhiteboard {
  position: absolute;
  top: 59vh;
  left: 3vw;
  background-color: #000;
  width: 33vw;
  height: 37vh;
  text-align: left;
}

#whiteboardCanvas {
  border: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: url('/whiteboard/wand.png'), auto;
}
</style>
<script>
import { getGameCode } from '@/lib/get-game-code';
import { getPlayerNumber } from '@/lib/get-player-number';
import firebaseUtil from '@/lib/firebase-util';
import PrimitiveBrush from '@/components/game/plugins/whiteboard/primitive-brush';

export default {
  name: 'Whiteboard',
  data() {
    return {
      publicPath: process.env.BASE_URL,
      hidden: false,
      primitiveBrush: null,
    }
  },
  firestore: {
    gameState: firebaseUtil.doc('/')
  },
  created() {
    window.addEventListener("resize", this.restartCanvas);
  },
  mounted() {
    window.document.addEventListener('selected-item', this.selectedItem);
    window.document.addEventListener('unselected-item', this.unselectedItem);
    this.initWhiteboard();
  },
  destroyed() {
    window.removeEventListener("resize", this.restartCanvas);
    window.document.removeEventListener('selected-item', this.selectedItem);
    window.document.removeEventListener('unselected-item', this.unselectedItem);
  },
  methods: {
    getGameCode() {
      return getGameCode();
    },
    getPlayerNumber() {
      return getPlayerNumber() || 0;
    },
    selectedItem() {
      this.hidden = true;
    },
    unselectedItem() {
      this.hidden = false;
    },
    initWhiteboard() {
      this.primitiveBrush = new PrimitiveBrush(document.getElementById('whiteboardCanvas'));
      this.restartCanvas();
    },
    restartCanvas() {
      this.resizeCanvas();
      this.reattach();
    },
    resizeCanvas() {
      const size = {
        width: window.innerWidth || document.body.clientWidth,
        height: window.innerHeight || document.body.clientHeight
      };
      document.getElementById('whiteboardCanvas').width = Math.floor(size.width * 0.33);
      document.getElementById('whiteboardCanvas').height = Math.floor(size.height * 0.37);
    },
    reattach() {
      if (this.primitiveBrush) this.primitiveBrush.dettach();
      this.primitiveBrush.attach((strokes) => this.sendStrokes(strokes));
    },
    sendStrokes: function (strokes) {
      let updatedObj = {};
      updatedObj[`spellplayer${this.getPlayerNumber()}`] = strokes;
      this.$firestoreRefs.gameState.update( updatedObj );
    }
  }
}
</script>
