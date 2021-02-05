const EVIL_NAME = 'JAIME';
const EVIL_LETTERS = {
  J: '3',
  A: '1',
  I: '2',
  M: '4',
  E: '5',
};

export default {
  background: 'background-bikotxikis.jpg',
  'EVIL_NAME': EVIL_NAME,
  'ROOM_2_PIZARRA_ARGS': { image: 'game/2/pizarra-hint-3.jpg', left: 55, top: 35,
    fontSize: 7, text: 'RAPIDO', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_6_PIZARRA_ARGS': { image: 'game/6/pizarra-hint-1.jpg', left: 15, top: 33,
    fontSize: 6, text: 'EL    TIEMPO    CORRE', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_8_PIZARRA_ARGS': { image: 'game/8/pizarra-hint-2.jpg', left: 12, top: 37,
    fontSize: 5.5, text: 'JUNTOS    SALIMOS', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_8_COMPUTER_ARGS': { image: 'game/8/room8-monitor-password-entered.jpg', left: 37, top: 59,
    fontSize: 5, text: EVIL_NAME.split('').join(' '), evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  images: {
    '#CARTA_INICIAL#': 'carta-bikotxikis.jpg',
    '#CUEVA_Y_HECHICERO#': 'cueva-y-hechicero-bikotxikis.jpg',
    '#LIBRO_BIBLIO#': 'book-bikotxikis.jpg'
  },
  welcomeText: [
    'Maite, Tasio, Nicole y Loic,<br /><br />',
    'Estoy atrapado.<br /><br />',
    'Soy Jordi, instalador de ordenadores. Cuando fui a arreglar ordenadores del colegio Lago ',
    'Mendillori, alguien me pilló husmeando.<br /><br />',
    'Algo debí encontrar porque me han encerrado. <br /><br />',
    'Aritz me ha dicho que conocéis este colegio a fondo y que sois personas muy inteligentes. <br /><br />',
    'Ayudadme a salir y veamos qué misterios esconde este colegio.',
  ].join(''),
}

