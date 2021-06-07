const EVIL_NAME = 'BRUJA LOLA';
const EVIL_LETTERS = {
  B: '3',
  R: '1',
  U: '2',
  J: '4',
  A: '5',
  L: '6',
  O: '7',
};

export default {
  background: 'background-noafriends.jpg',
  'EVIL_NAME': EVIL_NAME,
  'ROOM_2_PIZARRA_ARGS': { image: 'game/2/pizarra-hint-3-A.jpg', left: 55, top: 35,
    fontSize: 7, text: 'RAPIDO', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_6_PIZARRA_ARGS': { image: 'game/6/pizarra-hint-1-A.jpg', left: 15, top: 33,
    fontSize: 5, text: 'BIENVENIDAS, SOIS LISTAS', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_8_PIZARRA_ARGS': { image: 'game/8/pizarra-hint-2-A.jpg', left: 12, top: 37,
    fontSize: 5.5, text: 'NO ES UN JUEGO', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_8_COMPUTER_ARGS': { image: 'game/8/room8-monitor-password-entered-noafriends.jpg', left: 22, top: 59,
    fontSize: 5, text: EVIL_NAME.split('').join(' '), evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  images: {
    '#CARTA_INICIAL#': 'carta-noafriends.jpg',
    '#CUEVA_Y_HECHICERO#': 'cueva-y-hechicero-noafriends.jpg',
    '#LIBRO_BIBLIO#': 'book-noafriends.jpg',
    '#VIDEO_PISTA#': 'videopista-noafriends.mp4',
    '#ROOM2_BIBLIO#': 'biblio-noafriends.jpg',
    '#ROOM5_POLI#': 'poli-noafriends.jpg',
    '#ROOM6_STEAM#': 'room6-noafriends.jpg',
    '#ROOM8_AULA#': 'aula-noafriends.jpg',
    '#ROOM8_ORDENADOR_ON#': 'room8-monitor-password-entered-noafriends.jpg'
  },
  welcomeText: [
    'Aupa!,<br /><br />',
    'Estoy atrapado.<br /><br />',
    'Soy Jordi, hago apps de salud y me pidieron ir a vuestro colegio a presentarlas. ',
    'Pero me puse a husmear, y alguien me pilló...<br /><br />',
    'Algo debí encontrar porque me han encerrado. <br /><br />',
    'David me ha dicho que conocéis este colegio a fondo y que sois personas muy inteligentes. <br /><br />',
    'Ayudadme a salir y veamos qué misterios esconde este colegio.',
  ].join(''),
}

