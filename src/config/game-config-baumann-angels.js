const EVIL_NAME = 'EL LORO';
const EVIL_LETTERS = {
  E: '3',
  L: '1',
  O: '5',
  R: '4'
};

export default {
  background: 'background-baumann-angels.jpg',
  'EVIL_NAME': EVIL_NAME,
  'ROOM_2_PIZARRA_ARGS': { image: 'game/2/pizarra-hint-3.jpg', left: 55, top: 35,
    fontSize: 7, text: 'SALID', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_6_PIZARRA_ARGS': { image: 'game/6/pizarra-hint-1.jpg', left: 15, top: 33,
    fontSize: 6, text: 'ESCAPAD', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_8_PIZARRA_ARGS': { image: 'game/8/pizarra-hint-2.jpg', left: 12, top: 37,
    fontSize: 5.5, text: 'EL TERROR VIENE', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_8_COMPUTER_ARGS': { image: 'game/8/room8-monitor-password-entered-baumann-angels.jpg', left: 37, top: 59,
    fontSize: 5, text: EVIL_NAME, evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  images: {
    '#CARTA_INICIAL#': 'carta-baumann-angels.jpg',
    '#CUEVA_Y_HECHICERO#': 'cueva-y-hechicero-baumann-angels.jpg',
    '#LIBRO_BIBLIO#': 'book-baumann-angels.jpg',
    '#VIDEO_PISTA#': 'videopista-baumann-angels.mp4',
    '#ROOM2_BIBLIO#': 'biblio-baumann-angels.jpg',
    '#ROOM5_POLI#': 'poli-baumann-angels.jpg',
    '#ROOM6_STEAM#': 'steamroom-baumann-angels.jpg',
    '#ROOM8_AULA#': 'aula-baumann-angels.jpg'
  },
  welcomeText: [
    'Martina, Mandi, Alonso, Marcos,<br /><br />',
    'Estoy atrapado.<br /><br />',
    'Soy Jordi, de la perrera. Chela se volvió a meter al colegio, ',
    'y me pidieron del Colegio San Miguel de Arcángel que la buscara. <br /><br />',
    'Sin embargo, algo debí encontrar porque me han encerrado. <br /><br />',
    'Jorge me ha dicho que conocéis este colegio a fondo y que sois ',
    'personas muy inteligentes. <br /><br />',
    'Ayudadme a salir y veamos qué misterios esconde este colegio.',
  ].join(''),
}

