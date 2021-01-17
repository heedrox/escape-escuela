<template>
  <div>
    <moving-wizard-image :active-spell="gameState.activeSpell" />
    <div v-if="isAdmin()" class="adminControlSpell">
      <button @click="adminThrowSpell">
        LANZAR HECHIZO
      </button>
      {{ player0strokes }} -
      {{ player1strokes }} -
      {{ player2strokes }} -
      {{ player3strokes }}
      <button @click="showSpellResult">
        VER RESULTADO
      </button>
    </div>
    <moving-wizard-spell-result></moving-wizard-spell-result>
  </div>
</template>
<style lang="scss" scoped="true">

.adminControlSpell {
  position: fixed;
  top: 0vh;
  left: 0vw;
}


</style>
<script>
import { isAdmin } from '@/lib/is-admin';
import firebaseUtil from '@/lib/firebase-util';
import { getNumberPlayers } from '@/lib/get-number-players';
import MovingWizardSpellResult from '@/components/game/plugins/moving-wizard/MovingWizardSpellResult';
import MovingWizardImage from '@/components/game/plugins/moving-wizard/MovingWizardImage';
import { SPELLS_BY_WIZARD } from '@/components/game/plugins/moving-wizard/spells-by-wizard';

export default {
  name: 'MovingWizard',
  components: {
    MovingWizardImage,
    MovingWizardSpellResult
  },
  data() {
    return {
      gameState: {
        activeSpell: 0, //indexed by 1, 0 = no active
        spellplayer0: [], spellplayer1: [], spellplayer2: [], spellplayer3: [] },
    }
  },
  firestore: {
    gameState: firebaseUtil.doc('/')
  },
  computed: {
    player0strokes() {
      return this.gameState.spellplayer0 ? this.gameState.spellplayer0.length : 0 ;
    },
    player1strokes() {
      return this.gameState.spellplayer1 ? this.gameState.spellplayer1.length : 0 ;
    },
    player2strokes() {
      return this.gameState.spellplayer2 ? this.gameState.spellplayer2.length : 0 ;
    },
    player3strokes() {
      return this.gameState.spellplayer3 ? this.gameState.spellplayer3.length : 0 ;
    },
  },
  methods: {
    isAdmin() {
      return isAdmin();
    },
    adminThrowSpell() {
      const activeSpell = this.calculateNextSpell();
      this.$firestoreRefs.gameState.update( { activeSpell });
    },
    calculateNextSpell() {
      if (!this.gameState.activeSpell) return 1;
      const nextSpell = this.gameState.activeSpell + 1;
      return (nextSpell >= SPELLS_BY_WIZARD[`when${getNumberPlayers()}players`].length) ? 1 : nextSpell;
    },
    showSpellResult() {

    },
  }
}
</script>
