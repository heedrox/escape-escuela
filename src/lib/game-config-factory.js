import { getGameCode } from '@/lib/get-game-code';
const baseConfig = require('../config/game-config').default;

export default {
  get: () => {
    const gameCode = getGameCode();
    const configByGameCode = require('../config/game-config-' + gameCode).default;

    //codes
    console.log(baseConfig);
    baseConfig.codes.push(configByGameCode.EVIL_NAME);

    //pizarra args
    for (let a = 0; a<baseConfig.items.length; a++) {
      if (baseConfig.items[a].plugin === true) {
        if (baseConfig.items[a].args === 'ROOM_2_PIZARRA_ARGS') {
          baseConfig.items[a].args = configByGameCode['ROOM_2_PIZARRA_ARGS'];
        } else if (baseConfig.items[a].args === 'ROOM_6_PIZARRA_ARGS') {
          baseConfig.items[a].args = configByGameCode['ROOM_6_PIZARRA_ARGS'];
        } else if (baseConfig.items[a].args === 'ROOM_8_PIZARRA_ARGS') {
          baseConfig.items[a].args = configByGameCode['ROOM_8_PIZARRA_ARGS'];
        } else if (baseConfig.items[a].args === 'ROOM_8_COMPUTER_ARGS') {
          baseConfig.items[a].args = configByGameCode['ROOM_8_COMPUTER_ARGS'];
        }
      }
    }
    return baseConfig;
  }
}
