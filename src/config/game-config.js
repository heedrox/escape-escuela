import NumbersGame from '@/components/game/plugins/numbers-game/NumbersGame';
import MasterMind from '@/components/game/plugins/master-mind/MasterMind';
import { getNumberPlayers } from '@/lib/get-number-players';
import Whiteboard from '@/components/game/plugins/whiteboard/Whiteboard';
import PuzzleRoom8RotatingImages from '@/components/game/plugins/puzzle-room-8/PuzzleRoom8RotatingImages';
import { getPlayerNumber } from '@/lib/get-player-number';
import { isAdmin } from '@/lib/is-admin';
import playerCodes from './player-codes';
import DronCameraGame from '@/components/game/plugins/dron-camera-game/DronCameraGame';
import PizarraHint from '@/components/game/plugins/pizarra-hint/PizarraHint';

const anItem = (id, roomId, image, type = '') =>
  ({ id, roomId, image, type, corrupted: false, invisible: false });
const anAudioItem = (id, roomId, image, thumbnail) =>
  ({ id, roomId, image, thumbnail, type: 'MP3', corrupted: false, invisible: false });

const anInvisibleItem = (id, roomId, image, type = '') =>
  ({ id, roomId, image, type, corrupted: false, invisible: true });
const aCorruptedItem = (id, roomId, image, destinataries, type = '') =>
  ({ id, roomId, image, destinataries, type, corrupted: true });
const aDifferentItem = (id, roomId, imageA, imageB, destinataries) =>
  ({ id, roomId, imageA, imageB, destinataries, different: true });
const aDifferentItemMultiple = (id, roomId, images) =>
  ({ id, roomId, images, differentMultiple: true });
const anImageFor = (image, whoSees) => ({ image, whoSees });
const aPluginItem = (id, roomId, image, pluginVue, args) =>
  ({ id, roomId, image, pluginVue, args, plugin: true });
const byNumberDestinataries = (ifTwo, ifThree) => ({ ifTwo, ifThree });

const when2 = (resIf2, resIf3) => (getNumberPlayers() === 2 ? resIf2 : resIf3);

const ROOM_2_PIZARRA_ARGS = { image: 'game/2/pizarra-hint-3.jpg', left: 50, top: 20,
  fontSize: 4, text: 'CORRED' };

const ROOM_6_PIZARRA_ARGS = { image: 'game/6/pizarra-hint-1.jpg', left: 15, top: 33,
  fontSize: 6, text: 'EL TIEMPO SE AGOTA' };

const ROOM_8_PIZARRA_ARGS = { image: 'game/8/pizarra-hint-2.jpg', left: 12, top: 37,
  fontSize: 4.8, text: 'EL INNOMBRABLE SE ACERCA' };


export default {
  defaultActiveRoom: 4,
  availableRooms: [2, 4, 5, 6, 7, 8, 9],
  defaultUnlockedRooms: [4],
  defaultUnlockedItems: [],
  players: playerCodes,
  embedVideoconference: false,
  codes: [
    '0000', //to test

    '5834',   //room4 - lockbox - las letras has de contar - hasta infinito mas alla3

    '2443',   //room 5 - tetris box
    '246315', //room 5 - book
    '42387',  //room 5 - dron
    '354',    //room 6 - closet lock (stars)

    'SECAL', //room 8 - computer password


    'DBFA', //room 9 - part 1
    'KNMI', //room 9 - part 2
    'XTRU', //room 9 - part 3
    'DBFAKNMIXTRU', //room 9 - all , just in case they try like this also

    'C', //room 8 puzzle easy
    'CANE', //room 8
    'MUERTEYODESTRUCTOR', //room 7- final 18 letter passcode
  ],
  items: [
    anItem(201, 2, 'room2.jpg'),
    anItem(202, 2, 'library.jpg'),
    anItem(203, 2, 'room2-book.jpg'),
    aPluginItem(204, 2, 'pizarra-hint-3.jpg', PizarraHint, ROOM_2_PIZARRA_ARGS),


    anItem(401, 4, 'room-jail.jpg'),
    anItem(402, 4, 'lockbox-con-candado.jpg'),
    anItem(403, 4, 'poster-toystory.jpg'),
    anItem(404, 4, 'room4-escoba.jpg'),
    anItem(405, 4, 'carta.jpg'),
    //falta contenido de la caja
    anItem(406, 4, 'garfio.jpg'),
    anItem(407, 4, 'dron.jpg'),
    anItem(408, 4, 'llave.jpg'),

    anItem(501, 5, 'room.jpg'),
    aPluginItem(502, 5, 'dron-camera-game.jpg', DronCameraGame),
    anItem(503, 5, 'caja1.jpg'),
    anItem(504, 5, 'caja2.jpg'),
    anItem(505, 5, 'caja3.jpg'),
    aCorruptedItem(506, 5, 'caja1-paper.jpg', byNumberDestinataries([1], [1])),
    aCorruptedItem(507, 5, 'caja2-paper.jpg', byNumberDestinataries([2], [2])),
    aCorruptedItem(508, 5, 'caja3-paper.jpg', byNumberDestinataries([3], [3])),

    anItem(601, 6, 'room6-steam.jpg'),
    anItem(602, 6, 'room6-armario.jpg'),
    anItem(603, 6, 'room6-tetris-switch.jpg'),
    anItem(604, 6, 'room6-trampilla.jpg'),
    anItem(605, 6, 'battery.jpg'),
    anItem(606, 6, 'room6-enchufe.jpg'),
    aPluginItem(607, 6, 'pizarra-hint-1.jpg', PizarraHint, ROOM_6_PIZARRA_ARGS),

    anItem(801, 8, 'room8-aula.jpg'),
    anItem(802, 8, 'room8-espejo.jpg'),
    anItem(803, 8, 'room8-ordenador.jpg'),
    anItem(804, 8, 'tetris-solution.jpg'),
    anItem(805, 8, 'room8-ordenador-password.jpg'),
    anItem(806, 8, 'room8-monitor-password-entered.jpg'),
    aPluginItem(807, 8, 'pizarra-hint-2.jpg', PizarraHint, ROOM_8_PIZARRA_ARGS),


  ]
}
