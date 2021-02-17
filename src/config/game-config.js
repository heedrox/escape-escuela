import Whiteboard from '@/components/game/plugins/whiteboard/Whiteboard';
import playerCodes from './player-codes';
import DronCameraGame from '@/components/game/plugins/dron-camera-game/DronCameraGame';
import PizarraHint from '@/components/game/plugins/pizarra-hint/PizarraHint';
import MovingWizard from '@/components/game/plugins/moving-wizard/MovingWizard';

const anItem = (id, roomId, image, type = '') =>
  ({ id, roomId, image, type, corrupted: false, invisible: false });
const aVideoItem = (id, roomId, image) =>
  ({ id, roomId, image, type: 'VIDEO', corrupted: false, invisible: false });

const anInvisibleItem = (id, roomId, image, type = '') =>
  ({ id, roomId, image, type, corrupted: false, invisible: true });
const aCorruptedItem = (id, roomId, image, destinataries, type = '') =>
  ({ id, roomId, image, destinataries, type, corrupted: true });
const aDifferentItemMultiple = (id, roomId, images) =>
  ({ id, roomId, images, differentMultiple: true });
const anImageFor = (image, whoSees) => ({ image, whoSees });
const aPluginItem = (id, roomId, image, pluginVue, args) =>
  ({ id, roomId, image, pluginVue, args, plugin: true });
const byNumberDestinataries = (ifTwo, ifThree, ifFour) => ({ ifTwo, ifThree, ifFour });


const EVIL_NAME = 'CHISPIS';

export default {
  defaultActiveRoom: 4,
  availableRooms: [2, 4, 5, 6, 7, 8],
  defaultUnlockedRooms: [4],
  defaultUnlockedItems: [],
  players: playerCodes,
  embedVideoconference: false,
  welcomeText: [
    'Iñigo & amigos,<br /><br />',
    'Estoy atrapado.<br /><br />',
    'Cuando fui a recoger a Iñigo al colegio, alguien me pilló husmeando.<br /><br />',
    'Algo debí encontrar porque me han encerrado. <br /><br />',
    'Ayudadme a salir y veamos qué misterios esconde este colegio.',
  ].join(''),
  codes: [
    '0000', //to test

    '5834',   //room4 - lockbox - las letras has de contar - hasta infinito mas alla3

    '2443',   //room 5 - tetris box
    '246315', //room 5 - book
    '42387',  //room 5 - dron
    '354',    //room 6 - closet lock (stars)

    'SECAL', //room 8 - computer password


    EVIL_NAME, //room 8 - mirror CHISPIS
  ],
  fullScreenPlugins: [
    Whiteboard,
    MovingWizard
  ],
  items: [
    anItem(201, 2, '#ROOM2_BIBLIO#'),
    anItem(202, 2, 'library.jpg'),
    anItem(203, 2, '#LIBRO_BIBLIO#'),
    aPluginItem(204, 2, 'pizarra-hint-3.jpg', PizarraHint, 'ROOM_2_PIZARRA_ARGS'),
    anItem(205, 2, 'varita.jpg'),

    anItem(401, 4, 'room-jail.jpg'),
    anItem(402, 4, 'lockbox-con-candado.jpg'),
    anItem(403, 4, 'poster-toystory.jpg'),
    anItem(404, 4, 'room4-escoba.jpg'),
    anItem(405, 4, '#CARTA_INICIAL#'),
    anItem(406, 4, 'garfio.jpg'),
    anItem(407, 4, 'dron.jpg'),
    anItem(408, 4, 'llave.jpg'),

    anItem(501, 5, '#ROOM5_POLI#'),
    aPluginItem(502, 5, 'dron-camera-game.jpg', DronCameraGame),
    anItem(503, 5, 'caja1.jpg'),
    anItem(504, 5, 'caja2.jpg'),
    anItem(505, 5, 'caja3.jpg'),
    aCorruptedItem(506, 5, 'caja1-paper.jpg', byNumberDestinataries([1], [1], [1])),
    aCorruptedItem(507, 5, 'caja2-paper.jpg', byNumberDestinataries([2], [2], [2])),
    aCorruptedItem(508, 5, 'caja3-paper.jpg', byNumberDestinataries([3], [3], [3,4])),

    anItem(601, 6, '#ROOM6_STEAM#'),
    anItem(602, 6, 'room6-armario.jpg'),
    anItem(6021, 6, 'baumann-cuadro-3.jpg'),
    anItem(6022, 6, 'baumann-cuadro-1.jpg'),
    anItem(6023, 6, 'baumann-cuadro-2.jpg'),
    anItem(603, 6, 'room6-tetris-switch.jpg'),
    anItem(604, 6, 'room6-trampilla.jpg'),
    anItem(605, 6, 'battery.jpg'),
    anItem(606, 6, 'room6-enchufe.jpg'),
    aPluginItem(607, 6, 'pizarra-hint-1.jpg', PizarraHint, 'ROOM_6_PIZARRA_ARGS'),

    anItem(701, 7, '#CUEVA_Y_HECHICERO#'),
    aDifferentItemMultiple(702, 7, [
      anImageFor('magia-negra-spells-1.jpg', [1, 4]),
      anImageFor('magia-negra-spells-2.jpg', [2]),
      anImageFor('magia-negra-spells-3.jpg', [3])
    ]),
    anItem(703, 7, 'magia-blanca-spells.jpg'),
    aVideoItem(704, 7, 'escape-escuela-ending.mp4'),
    anInvisibleItem(790, 7, 'monster-scream.mp3', 'MP3'),
    anInvisibleItem(791, 7, 'monster-laugh.mp3', 'MP3'),

    anItem(801, 8, '#ROOM8_AULA#'),
    anItem(802, 8, 'room8-espejo.jpg'),
    anItem(803, 8, 'room8-ordenador.jpg'),
    anItem(804, 8, 'tetris-solution.jpg'),
    anItem(805, 8, 'room8-ordenador-password.jpg'),
    aPluginItem(806, 8, 'room8-monitor-password-entered.jpg', PizarraHint, 'ROOM_8_COMPUTER_ARGS'),
    aPluginItem(807, 8, 'pizarra-hint-2.jpg', PizarraHint, 'ROOM_8_PIZARRA_ARGS'),
    aVideoItem(808, 8, '#VIDEO_PISTA#'),
    anInvisibleItem(890, 8, 'broken-glass.mp3', 'MP3'),



  ]
}

