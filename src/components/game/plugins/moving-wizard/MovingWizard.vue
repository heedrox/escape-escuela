<template>
  <div>
    <moving-wizard-image :active-spell="gameState.activeSpell" :show-spell="gameState.spellShowIt"
                         :wizard-health="wizardHealth"
    />
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
    <moving-wizard-spell-result v-if="gameState.spellShowResult"
                                :active-spell="gameState.activeSpell"
                                :player1-image="gameState.spellplayer1"
                                :player2-image="gameState.spellplayer2"
                                :player3-image="gameState.spellplayer3"
                                @result-ok="resultOk()"
                                @result-ko="resultKo()"
    ></moving-wizard-spell-result>
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
import gameActions from '@/lib/game-actions-lib';

const WIZARD_AUDIOS = {
  OK: 790,
  KO: 791
};

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
        spellplayer0: '', spellplayer1: '', spellplayer2: '', spellplayer3: '',
        spellShowResult: false,
        spellWizardHealth: 100,
        spellShowIt: false,
      },
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
    wizardHealth() {
      if (!this.gameState.spellWizardHealth) return 100;
      if (this.gameState.spellWizardHealth<=0) return 0;
      return this.gameState.spellWizardHealth;
    }
  },
  methods: {
    isAdmin() {
      return isAdmin();
    },
    adminThrowSpell() {
      this.$firestoreRefs.gameState.update( { spellShowResult: false });
      const activeSpell = this.calculateNextSpell();
      this.$firestoreRefs.gameState.update( { activeSpell: 0,
        spellplayer0: '', spellplayer1: '', spellplayer2: '', spellplayer3: '', spellShowIt: false });
      setTimeout(() => {
        this.$firestoreRefs.gameState.update( { activeSpell, spellShowIt: true });
      }, 1000);
    },
    calculateNextSpell() {
      if (!this.gameState.activeSpell) return 1;
      const nextSpell = this.gameState.activeSpell + 1;
      return (nextSpell >= SPELLS_BY_WIZARD[`when${getNumberPlayers()}players`].length) ? 1 : nextSpell;
    },
    showSpellResult() {
      this.$firestoreRefs.gameState.update( { spellShowResult: true });
    },
    resultOk() {
      gameActions.send(this.$firestoreRefs.gameState, { id: 'AUDIO', argId: WIZARD_AUDIOS.OK})
      this.$firestoreRefs.gameState.update( { spellWizardHealth: this.addWizardHealth(-40), spellShowIt: false });
      this.showSpell = false;
    },
    resultKo() {
      gameActions.send(this.$firestoreRefs.gameState, { id: 'AUDIO', argId: WIZARD_AUDIOS.KO})
      this.$firestoreRefs.gameState.update( { spellWizardHealth: this.addWizardHealth(40), spellShowIt: false });
      this.showSpell = true;
    },
    addWizardHealth(num) {
      const currentHealth = this.gameState.spellWizardHealth ? this.gameState.spellWizardHealth : 100;
      return currentHealth + num;
    }
  }
}
</script>
