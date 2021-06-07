const EVIL_NAME = 'DONTXEMA';
const EVIL_LETTERS = {
  D: '3',
  O: '1',
  N: '2',
  T: '4',
  X: '5',
  E: '6',
  M: '7',
  A: '8',
};

export default {
  background: 'background-alvardespe.jpg',
  'EVIL_NAME': EVIL_NAME,
  'ROOM_2_PIZARRA_ARGS': { image: 'game/2/pizarra-hint-3-O.jpg', left: 52, top: 35,
    fontSize: 7, text: 'XILOFONO', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_6_PIZARRA_ARGS': { image: 'game/6/pizarra-hint-1-O.jpg', left: 15, top: 33,
    fontSize: 6, text: 'EL ES UN TRAIDOR', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_8_PIZARRA_ARGS': { image: 'game/8/pizarra-hint-2-O.jpg', left: 12, top: 37,
    fontSize: 5.5, text: 'MORADO ES UN COLOR', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_8_COMPUTER_ARGS': { image: 'game/8/room8-monitor-password-entered-alvardespe.jpg', left: 26, top: 59,
    fontSize: 5.1, text: EVIL_NAME.split('').join(' '), evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  images: {
    '#CARTA_INICIAL#': 'carta-alvardespe.jpg',
    '#CUEVA_Y_HECHICERO#': 'cueva-y-hechicero-alvardespe.jpg',
    '#LIBRO_BIBLIO#': 'book-alvardespe.jpg',
    '#VIDEO_PISTA#': 'videopista-alvardespe.mp4',
    '#ROOM2_BIBLIO#': 'biblio-alvardespe.jpg',
    '#ROOM5_POLI#': 'poli-alvardespe.jpg',
    '#ROOM6_STEAM#': 'steamroom-alvardespe.jpg',
    '#ROOM8_AULA#': 'room8-alvardespe.jpg',
    '#ROOM8_ORDENADOR_ON#': 'room8-monitor-password-entered-alvardespe.jpg'
  },
  welcomeText: [
    'Aupa!,<br /><br />',
    'Estoy atrapado.<br /><br />',
    'Soy Jordi, trabajo con ordenadores. Me llamaron para echar un vistazo a Lazarus. ',
    'Pero me puse a husmear, y alguien me pilló...<br /><br />',
    'Algo debí encontrar porque me han encerrado. <br /><br />',
    'Natalia me ha dicho que conocéis este colegio a fondo y que sois personas muy inteligentes. <br /><br />',
    'Ayudadme a salir y veamos qué misterios esconde este colegio.',
  ].join(''),
}

